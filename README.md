scss/sass parser

uses [dart-sass](https://github.com/sass/dart-sass)

## setup

- download [tsk-scss.tar.xz](https://github.com/r1vn/tsk-scss/raw/master/tsk-scss.tar.xz) and unpack as `your-project/lib/tsk-scss`
- add a config entry to the manifest

example config: parsing all .scss files from `frontend` directory into `tmp/css`

```
{
    module: 'lib/tsk-scss',
    config:
    {
        // path of the directory to get scss files from
        sourceDir: 'frontend',
        // filter for the files in sourceDir
        filterFn: srcPath => srcPath.endsWith('.scss'),
        // generates output paths based on source paths
        dstFn: srcPath => 'tmp/css/' + srcPath.replace(/.*\//, '').replace('.scss', '.css'),
        // options passed to dart-sass renderSync()
        // https://github.com/sass/dart-sass#javascript-api
        // https://sass-lang.com/documentation/js-api
        opts:
        {
            includePaths: ['frontend']
        },
        // toggles verbose output
        verbose: true
    }
}
```

input:

```
frontend/bar/file1.scss
frontend/baz/file2.scss
frontend/file3.scss
frontend/var.scss
```

output:

```
tmp/css/file1.css
tmp/css/file2.css
tmp/css/file3.css
tmp/css/var.css
```