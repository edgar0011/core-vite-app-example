import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import dayjs from 'dayjs'
import simpleGit, { SimpleGit } from 'simple-git'

export const DATE_FORMAT = 'DD.MM.YYYY'

console.log('import.meta.url', import.meta.url)

// eslint-disable-next-line no-underscore-dangle
const __dirname = fileURLToPath(import.meta.url).split('/').slice(0, -1).join('/')

console.log('__dirname', __dirname)

interface ICommit {
  hash: string
  message: string
  date: string
}

type ChangelogArrayType = [string, ICommit[]][];

const git: SimpleGit = simpleGit()

const CHANGELOG_PATH = path.resolve(__dirname, '../../CHANGELOG.md')

async function getLatestReleaseCommit(): Promise<string> {
  const { current: currentBranch } = await git.branch()
  const prevReadme = getPreviousReadMe()

  // Read previous readme and find the latest commit release that was generated
  // return the release lates release tag on the readme
  const commitMessage = (await prevReadme).split('\n')[1]?.split(' ')[2]
  const log = await git.log([currentBranch])

  // Find the commit hash for the release tag
  // or Return the first commit hash in case there is no commit hash found
  return log.all.find(({ message }) => message === commitMessage)?.hash || log.all[log.all.length - 1].hash
}

async function getAllowedCommits(): Promise<string[]> {
  const commitsConfigFilePath = path.resolve(__dirname, './.versionrc.json')
  const file = await fs.readFile(commitsConfigFilePath)

  return JSON.parse(file.toString('utf-8')).types.reduce((accum: string[], curr: any) => {
    if (!curr.hidden) { return [...accum, curr.type] }

    return accum
  }, [])
}

async function getPreviousReadMe(): Promise<string> {
  let file

  try {
    file = await fs.readFile(CHANGELOG_PATH)
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      console.log('No CHANGELOG.md, creating new.')
    } else {
      console.error(error)
    }
  }

  file = file?.toString?.('utf-8') || ''

  // return previous README without the title # Changelog
  // (This that not affect the return value if the file is an empty string)
  return file.split('\n').slice(1).join('\n')
}

async function getRepositoryURL(): Promise<string> {
  let url = ''
  const remotes: { name: string; refs: { push: string } }[] = await git.getRemotes(true)
  const originRemote = remotes.find((remote) => remote.name === 'origin')

  if (originRemote) {
    url = originRemote.refs.push.substring(4, originRemote.refs.push.lastIndexOf('.git'))
  }

  return `https://${url.split(':').join('/')}`
}

async function generateChangelogFile(changelog: ChangelogArrayType) {
  // dont generate changelog if there is no new commits associated with a tag
  if (changelog.length === 0) {
    return
  }
  const repositoryURL = await getRepositoryURL()
  const prevReadMe = await getPreviousReadMe()

  const changelogObject: { [key: string]: { [key: string]: { elements: string[]; title: string } }} = {}

  // Fill changelogObject with default values
  changelog.forEach(([tag]) => {
    changelogObject[tag] = {
      feat: { elements: [], title: 'New Features' },
      fix: { elements: [], title: 'Bug Fixes' },
      chore: { elements: [], title: 'Chores' },
    }
  })

  changelog.forEach(([tag, changelogArray]) => {
    changelogArray.forEach((ch) => {
      if (ch.message.split(':').length === 1) { return }

      const msg = `(${
        dayjs(ch.date).format(DATE_FORMAT)
      }): ${ch.message.split(':')[1].trim()} [${ch.hash.slice(0, 7)}](${repositoryURL}/commit/${ch.hash})`

      if (ch.message.toLowerCase().includes('feat')) {
        changelogObject[tag].feat.elements.push(msg)
      } else if (ch.message.toLowerCase().includes('fix')) {
        changelogObject[tag].fix.elements.push(msg)
      } else if (ch.message.toLowerCase().includes('chore')) {
        changelogObject[tag].chore.elements.push(msg)
      }
    })
  })

  let markdown = '# Changelog\n'

  Object.keys(changelogObject).forEach((tag: string) => {
    markdown += `\n ###### ${tag}`

    Object.values(changelogObject[tag]).forEach(({ title, elements }) => {
      if (elements.length > 0) { markdown += `\n ##### ${title}` }
      elements.forEach((el) => { markdown += `\n* ${el}` })
    })

    markdown += '\n---\n\n'
  })

  markdown += `${prevReadMe}`
  fs.writeFile(CHANGELOG_PATH, markdown)
}


// - "npm run changelog:release" this would consider all the commits of the current branch

// - "npm run changelog:release <firstCommmitHash>" this considers all the commits from <firstCommmitHash> until HEAD

// - "npm run changelog:release <firstCommmitHash> <lastCommmitHash>" considers all commits between 2 commit hashes
(async (): void => {
  // eslint-disable-next-line max-len
  const semverRegex = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?$/
  const [firstCommitHash, lastCommitHash = 'HEAD'] = process.argv.slice(2)
  const git: SimpleGit = simpleGit()
  const firstCommit = firstCommitHash || await getLatestReleaseCommit()
  const allowedCommits = await getAllowedCommits()

  git.log({ from: firstCommit, to: lastCommitHash }, async (err, log) => {
    if (err) {
      console.error('Error retrieving commit log:', err)
      return
    }

    const resultArray: ChangelogArrayType = []
    let currentVersion: string | null = null
    let currentGroup: ICommit[] = []

    log.all.forEach((element) => {
      if (semverRegex.test(element.message)) {
        if (currentVersion !== null) {
          resultArray.push([currentVersion, currentGroup])
        }
        currentVersion = element.message
        currentGroup = []
      } else if (allowedCommits.some((commitType) => element.message.includes(commitType))) {
        currentGroup.push(element)
      }
    })

    if (currentVersion !== null) { resultArray.push([currentVersion, currentGroup]) }

    generateChangelogFile(resultArray)
  })
})()
