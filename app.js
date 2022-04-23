
import Koa from 'koa'
import path from 'path';
import KoaStatic from 'koa-static'
import koaBody  from 'koa-body'
import koajwt from 'koa-jwt'
import initDB from './config/db/initDB.js'
try {
  initDB()
} catch (error) {
  console.log('error', error)
}
// 接口
import loginRouter from './router/login/index.js'

const __dirname = path.resolve();
// 处理POST请求参数
const app = new Koa()
const PORT = 10086 ;

// 访问静态文件
app.use(KoaStatic(
  path.join( __dirname,  "/public")
))

// 文件上传
app.use(koaBody({
  multipart:true, // 支持文件上传
  // encoding:'gzip',
  formidable:{
    uploadDir:path.join(__dirname,'public/upload/'), // 设置文件上传目录
    keepExtensions: true,    // 保持文件的后缀
    maxFieldsSize:2 * 1024 * 1024, // 文件上传大小
    onFileBegin:(name,file) => { // 文件上传前的设置
      // console.log(`name: ${name}`);
      // console.log(file);
    },
  }
}));

// 从url、body 或者 cookie 中获取 token
app.use(async (ctx, next) => {
  // url，body 的 token
  let params = Object.assign({}, ctx.request.query, ctx.request.body);
  // 请求头的 token
  let token = ctx.request.header && ctx.request.header.authorization?ctx.request.header.authorization:(params.token?params.token:null)
   // cookie 的token
  if(!token) {
    token = ctx.cookies.get('token') || null;
  }
  // 设置头部
  ctx.request.header.Authorization = `Bearer ${token}`;
  await next();
})

// 错误监听
app.use((ctx, next) => {
  return next().catch((err) => {
    console.log('err', err)
      if(err.status === 401){
        ctx.status = 401;
        ctx.body = {
          data:{
            code: -1,
            message:'Protected resource, use Authorization header to get access\n(token可能无效了)'
          }
        };
      }else{
          throw err;
      }
  })
})

// token校验 注意：放在路由前面
app.use(koajwt({
  secret: 'Gopal_token'
}).unless({ // 配置白名单
  // path：不需要鉴权的路由（开放访问的路由）。
  path: ['/register','/login']
}))

app.use(loginRouter.routes(),loginRouter.allowedMethods())// 允许http请求的所有方法


app.listen(PORT,() => {
  console.log(`('********************启动成功,${ "http://127.0.0.1"}:${PORT}********************`);
});