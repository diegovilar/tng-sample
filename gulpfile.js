/// <reference path="typings/node/node.d.ts"/>

var gulp = require('gulp');
var gutil = require('gulp-util');
var copy = require('gulp-copy');
var rename = require('gulp-rename');
var browserify = require('browserify');
var watchify = require('watchify');
var uglify = require('gulp-uglify');
var assign = require('lodash.assign');
var output = require('vinyl-source-stream');
var buffer = require('vinyl-buffer')
var sourcemaps = require('gulp-sourcemaps');
var ts = require("typescript");
var fs = require('fs');
var path = require('path');
var del = require('del');
var mkdir = require('mkdir-p').sync;



// -- Paths --

var srcDir = './src';
var buildDir = './build';
var buildBrowserDir = './build-browser';
var tsconfigPath = './tsconfig.json';



// -- Tasks --

gulp.task('default', ['build', 'build:browser']);
gulp.task('clean:build', cleanBuild);
gulp.task('clean:browser', cleanBuildBrowser);
gulp.task('clean', ['clean:build', 'clean:browser']);
gulp.task('build', ['clean:build'], build);
gulp.task('watch', ['build'], watch);
gulp.task('build:browser', ['clean:browser'], buildBrowser);
gulp.task('watch:browser', ['clean:browser'], watchBrowser);



// --

/**
 * Returns a cleander task function
 */
function createCleaner(globs) {
    return function(cb) {
        del(globs, cb);
    };
}

function cleanBuild(cb) {
    del(buildDir + '/*', cb);
}

function cleanBuildBrowser(cb) {
    del(buildBrowserDir + '/*', cb);
}

/**
 * Compiles the project
 */
function build(cb) {
    
    var tsconfig = parseTypescriptConfig();
    var options = tsconfig.compilerOptions;
    
    options.outDir = buildDir;
    //options.declaration = true;
    options.sourceMap = true;
    
    mkdir(buildDir);
    
    // TODO errors?
    // Compile ts files
    try {
        tsc(tsconfig.files, options);
        
        // Copy native module
        gulp.src(srcDir + '/native.js')
            .pipe(copy(buildDir, {prefix: 1}))
            .on('error', gutil.log.bind(gutil, 'Copy Error'));
            
        cb();
    }
    catch (e) {
        gutil.log(gutil.colors.red('Build error:'), e.toString());
    }
    
}

/**
 * 
 */
function watch() {
    
    var files = [
        srcDir + '/**/*',
        './typings/**/*',
        tsconfigPath
    ];
    
    files = files.concat(parseTypescriptConfig().files);
    gutil.log(files.join(', '));
    
    gulp.watch(files, function(event) {
        gutil.log('File', gutil.colors.magenta(event.path), gutil.colors.yellow(event.type));
        gulp.start(['build']);
    });
    
}

/**
 * Compiles a bundled version of the library for the browser
 */
function buildBrowser() {
    
    bundle(false);
  
}

function watchBrowser() {
    
    bundle(true);
    
}

function bundle(watch) {
    
    var entryFilePath = srcDir + '/main-browser.ts';    
    var destFileName = 'puts.js';
    
    var bundler;
    
    var bundlerOptions = {
        debug: true
    };
    
    if (watch) {
        bundlerOptions = assign({}, watchify.args, bundlerOptions);
        bundler = watchify(browserify(entryFilePath, bundlerOptions));
        bundler.on('log', gutil.log);        
        bundler.on('update', function(ids) {
            for (var i = 0; i < ids.length; i++) {
                gutil.log('Change detected on', gutil.colors.magenta(ids[i]));
            }
            return run();
        });
    }
    else {
        bundler = browserify(entryFilePath, bundlerOptions); 
    }    
    
    bundler.plugin('tsify', parseTypescriptConfig().compilerOptions);        
    
    function run() {
        mkdir(buildBrowserDir);
        return bundler
            .bundle()
            .pipe(output(destFileName))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
                //.pipe(uglify())
                //.pipe(rename(destFileName.replace(/\.js$/, '-min.js')))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(buildBrowserDir))
            .on('error', gutil.log.bind(gutil, 'Browserify Error'));
    }
        
    return run(); 
    
}

/**
 * 
 */
function parseTypescriptConfig(filePath) {
    
    if (!filePath) {
        filePath = tsconfigPath;
    }
    
    return JSON.parse(fs.readFileSync(filePath).toString());
    
}

/**
 * 
 */
function tsc(fileNames, options) {
    
    var ScriptTarget = {
        ES3 : 0,
        ES5 : 1,
        ES6 : 2,
        LATEST : 2 
    };
    var ModuleKind = {
        NONE : 0,
        COMMONJS : 1,
        AMD : 2
    };
    
    if (options) {
        if (typeof options.target === 'string') {
            options.target = ScriptTarget[options.target.toUpperCase()];
        }
        if (typeof options.module === 'string') {
            options.module = ModuleKind[options.module.toUpperCase()];
        }
    }
    
    var program = ts.createProgram(fileNames, options);
    var emitResult = program.emit();
    var allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);
    
    allDiagnostics.forEach(function (diagnostic) {
        var _a = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start), line = _a.line, character = _a.character;
        var message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
        throw new Error(diagnostic.file.fileName + " (" + (line + 1) + "," + (character + 1) + "): " + message);
    });
    
    //var exitCode = emitResult.emitSkipped ? 1 : 0;
    //if (exitCode) {
    //    grunt.log(`Process exiting with code '${exitCode}'.`);
    //}
    //return exitCode;
    
}