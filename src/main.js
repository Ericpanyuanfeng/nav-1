const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
    // JSON.parse() 把字符串变成对象
const hashMap = xObject || [{ logo: 'B', url: 'https://www.baidu.com' }, { logo: 'D', url: 'https://developer.mozilla.org/zh-CN' }]


const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '...') // 正则表达式，删除 / 后面的内容
}
const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class='close'>
                    <svg class="icon" >
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
            </div>
        </li>`).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation() // 阻止冒泡。防止点击关闭按钮时候会跳转
            hashMap.splice(index, 1)
            render() // 点击 close 删除以后需要重新渲染
        })
    })
}
render()
$('.addButton').on('click', () => {
    let url = window.prompt('请输入你想添加的网址(^_−)')
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        // toUpperCase() 将小写变成大写
        url: url
    })
    render()
})

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
        // JSON.stringify() 把对象变成字符串
    localStorage.setItem('x', string)
        // x 是 localStorage 开辟的空间的名字， localStorage 只能存字符串
}
$(document).on('keypress', (e) => {
    const key = e.key;
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})