# TSS Frontend

## 配置

```bash
npm install
npm start
```

## 代码结构

* src: 源码所在地
  * top: 整个项目顶层，包含一些公用的信息，如用户信息等，同时包括了：
    * 网站路由配置
    * 前端redux store配置
  * modules: 各模块代码，各组成员在该文件夹下建立自己的子目录，并在其中完成自己的部分

## 开发指导

观察示例的forum文件夹下的文件组织和命名，以此方式配置redux与组织代码，如需细分，可按照这样的方式继续细分。（如果对代码组织有更好的建议，欢迎提出）

在top模块中注册自己的reducer以及配置自己的路由，用于调试时使用，只需这样配置，便可以不受他人模块的影响进行测试。

Chrome浏览器安装react与redux插件，可以提升开发体验。

如果npm安装其他包，记得save //:~

### 测试后端及运行说明

后端未完成的时候，前端可以写伪的服务端返回数据来进行测试，工具有无数种，大家可以自行选择，如：

#### 第四组（Forum）

选用了`json-server`工具，运行方式：

本地安装json-server:

```bash
npm install -g json-server
```

cd到测试文件所在目录：

```bash
cd frontend/src/modules/forum/tests/ #注意相对路径
```

开启json-server:

```bash
json-server -w sample.json -r sample_route.json
```

运行成功之后，所有关于第四组论坛子系统的请求都会获取到来自：`localhost:8000`的返回
