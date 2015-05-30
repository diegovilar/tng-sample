/// <reference path="_references" />

var base = normalize(__dirname);

export function pathTo(file: string): string {
	
	var result = normalize(file).replace(`${__dirname}/`, '');
	console.log(`result = ${result}`);
	return result;
	
}

function normalize(path: string): string {
	
	return path.replace(/\\/g, '/');
	
}