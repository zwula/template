# umi project

## 项目搭建
### 使用 nvm 来管理 node 版本   
nvm -v 1.1.7
node -v 14.14.0

### 使用 yarn 管理 npm 依赖，并使用国内源
国内源
$ npm i yarn tyarn -g

### 通过umijs3.x版本官方工具创建项目
yarn create @umijs/umi-

### 安装依赖
yarn


## 目录结构
-/mock
-/src
&nbsp;&nbsp;&nbsp;&nbsp; -/.umi&nbsp;&nbsp; 临时文件，由umi自动生成
&nbsp;&nbsp;&nbsp;&nbsp; -/components&nbsp;&nbsp; 非路由组件
&nbsp;&nbsp;&nbsp;&nbsp; -/models&nbsp;&nbsp; 数据层
&nbsp;&nbsp;&nbsp;&nbsp; -/pages&nbsp;&nbsp; 路由组件
&nbsp;&nbsp;&nbsp;&nbsp; -/services&nbsp;&nbsp; 请求文件
&nbsp;&nbsp;&nbsp;&nbsp; -/utils&nbsp;&nbsp; 工具文件
&nbsp;&nbsp;&nbsp;&nbsp; -app.tsx&nbsp;&nbsp; 运行时配置文件，先于入口文件运行，运行顺序：global.tsx > app.tsx > umi.ts
&nbsp;&nbsp;&nbsp;&nbsp; -global.less&nbsp;&nbsp; 全局样式
&nbsp;&nbsp;&nbsp;&nbsp; -global.tsx&nbsp;&nbsp; 全局逻辑
-.env&nbsp;&nbsp; 正式环境变量
-.env.development&nbsp;&nbsp; 开发环境变量
-.gitignore
-.prettierignore
-.prettierc&nbsp;&nbsp; prettuer配置文件，后续删除，使用umijs/fabric代替
-.umirc.ts&nbsp;&nbsp; 约定式配置
-README.md
-tsconfig.json
-typings.d.ts
