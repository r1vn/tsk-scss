'use strict' // 2021-02-10 13.14

const path = require('path')
const sass = require('sass')
const { xdDirScan } = require('./util/xdDirScan')
const { xdFileWrite } = require('./util/xdFileWrite')
const { xdPath } = require('./util/xdPath')
const Config = require('./Config')

module.exports = function tsk_scss (opts)
{
    const debug = process.argv.includes('-debug')
    const config = new Config(opts)
    if (debug) console.log({ config })
    const srcdirRel = xdPath.std(config.sourceDir)
    const srcdirAbs = xdPath.abs(config.sourceDir)
    if (debug) console.log({ srcdirRel, srcdirAbs })
    const srcs = xdDirScan(srcdirAbs, 'files').filter(config.filterFn)
    const dsts = []

    for (let i = 0; i < srcs.length; i++)
    {
        console.log(`${ i + 1 }/${ srcs.length }`)
        const srcRel = `${ srcdirRel }/${ srcs[i] }`
        const srcAbs = `${ srcdirAbs }/${ srcs[i] }`
        const dstRel = xdPath.std(config.dstFn(srcRel))
        const dstAbs = xdPath.abs(dstRel)
        if (config.verbose) console.log(`src: ${ srcRel }\ndst: ${ dstRel }`)
        if (debug) console.log({ srcRel, srcAbs, dstRel, dstAbs })
        if (dsts.includes(dstAbs)) throw `duplicate destination path`
        dsts.push(dstAbs)

        const css = sass.renderSync({ file: srcAbs, ...config.opts }).css.toString()
        xdFileWrite(dstAbs, css)
    }

    console.log(`${ srcs.length } ${ srcs.length === 1 ? 'file' : 'files' }`)
}