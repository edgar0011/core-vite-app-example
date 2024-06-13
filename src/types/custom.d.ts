/* eslint-disable no-undef */

interface Window {
    /**
     * The CMF namespace.
     * @type {CMFType}
     */
    cmf?: CMFType
    getCMFNamespace: () => CMFType | null
    /*
    * @deprecated Use the getCMFNamespace instead.
    */
    getCMFWindowNamespace: () => CMFType | null
}
