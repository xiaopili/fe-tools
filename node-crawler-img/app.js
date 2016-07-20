//依赖模块
var fs = require('fs');
var request = require("request");
var cheerio = require("cheerio");
var mkdirp = require('mkdirp');

//目标网址
var url = 'https://image.baidu.com/search/index?tn=baiduimage&ct=201326592&lm=-1&cl=2&ie=gbk&word=%B0%D9%B6%C8%CD%BC%C6%AC&fr=ala&ori_query=%E7%99%BE%E5%BA%A6%E5%9B%BE%E7%89%87&ala=0&alatpl=sp&pos=0';

//本地存储目录
var dir = './images';

//创建目录
mkdirp(dir, function(err) {
    if(err){
        console.log(err);
    }
});

//发送请求
request(url, function(error, response, body) {
    console.log(!error,response.statusCode);
    if(!error && response.statusCode == 200) {
        var $ = cheerio.load(body);
        $('img').each(function() {
            var src = $(this).attr('src');
            if(src){
                src = 'http:' + src;
                console.log('正在下载' + src);
                download(src, dir, Math.floor(Math.random()*100000) + src.substr(-4,4));
                console.log('下载完成');
            }else{
                return
            }
        });
    }
});
//下载方法
var download = function(url, dir, filename){
    request.head(url, function(err, res, body){
        request(url).pipe(fs.createWriteStream(dir + "/" + filename));
    });
};