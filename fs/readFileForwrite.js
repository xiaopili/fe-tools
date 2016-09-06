/**
 * Created by liangxiao on 16/9/2.
 */
var path = require('path');
var fs = require('fs');
var pathName = path.join(__dirname,'./views');
var outPutName = path.join(__dirname,'./output/views.md');
fs.readdir(pathName, function (err, files) {
	if (err) {
		console.log(err);
		return;
	}

	var results = '';
	var len = files.length;
	var num = 0;
	files.forEach(function (filename) {
		fs.readFile(pathName + '/' +filename, function (err, data) {
			results += data;
			if(num == len-1){
				fs.writeFileSync(outPutName, results, 'utf8');
			}
			num ++;
		});
	});
});