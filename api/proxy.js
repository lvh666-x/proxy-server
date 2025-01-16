// 引入 HTTP 请求库
const fetch = require('node-fetch');

module.exports = async (req, res) => {
    // 目标 API 地址
    const targetUrl = 'https://cmms.xmjt.g2b.com.cn/cmms-sol/d985c6ed68e2476285812042b16413c8/sol_videoLiveLst.xdo?rows=20&page=1&personid=d480e601e5b446a688c47ba462f54d7e&sign=NmVhNWVlZjViM2ZiYzc2ZTk1OTdkNDg3MDk5YzlhMTM&title&liveType=1';

    if (req.method === 'POST') {
        try {
            // 将请求体传递给目标 API
            const response = await fetch(targetUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': req.headers['content-type'] || 'application/json'
                },
                body: req.body // 转发请求体
            });

            // 获取目标 API 的响应数据
            const data = await response.json();

            // 将数据返回给前端
            res.status(response.status).json(data);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Something went wrong!' });
        }
    } else {
        // 只允许 POST 请求
        res.status(405).json({ error: 'Method not allowed' });
    }
};
