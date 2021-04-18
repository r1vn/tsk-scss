'use strict'

module.exports = class Config
{
    sourceDir
    filterFn
    dstFn
    opts
    verbose

    constructor (opts)
    {
        for (const key in this)
        {
            if (!opts.hasOwnProperty(key))
            {
                throw `missing property in config: ${ key }`
            }
        }

        for (const key in opts)
        {
            if (!this.hasOwnProperty(key))
            {
                throw `unknown property in config: ${ key }`
            }

            this[key] = opts[key]
        }

        // sourceDir

        if (typeof this.sourceDir !== 'string')
        {
            throw `config.sourceDir: must be a string`
        }

        // filterFn / dstFn

        for (const prop of ['filterFn', 'dstFn'])
        {
            if (typeof this[prop] !== 'function')
            {
                throw `config.${ prop } must be a function`
            }
        }
    }
}