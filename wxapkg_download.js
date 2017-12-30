const fs = require('fs')
const request = require('request')
const resp = require('./getwxportalindex.json')

const {top_game_list, game_list} = resp.data.recom_block
const all_game_list = top_game_list.concat(game_list)

const download = function(url, dest, callback) {
    request.get(url)
    .on('error', function(err) {console.log(err)} )
    .pipe(fs.createWriteStream(dest))
    .on('close', callback)

}

const rename = function(from, to) {
    fs.rename(from, to, function(err) {
    if ( err ) console.log('ERROR: ' + err)
});
}

all_game_list.forEach(function(game) {
    const dest =  `${game.app_info.base.appid}_${game.app_info.base.appname}.wxpkg`
    const url = `http://119.147.33.22/resstatic.servicewechat.com/weapp/release/${game.app_info.base.appid}/1.wxapkg`
    console.log(`Downloading ${dest} from ${url}`)
    download(url, dest, function(){console.log(`Finished Downloading ${dest}`)})
})

