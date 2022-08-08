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





## 项目配置
### umi 维护了一个 prettier，eslint，stylelint 的配置文件合集 umi-fabric
yarn add @umijs/fabric

删除项目创建时 .prettierrc 文件
新增.eslintrc.js、.prettierrc.js、.stylelintrc.js 文件

.eslintrc.js

    module.exports = {
        extends: [require.resolve('@umijs/fabric/dist/eslint')],

        // in antd-design-pro
        globals: {
            ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
            page: true,
        },

        rules: {
            // your rules
        },
    };

.prettierrc.js

    const fabric = require('@umijs/fabric');

    module.exports = {
        ...fabric.prettier,
        // your rules
    };

.stylelintrc.js

    const fabric = require('@umijs/fabric')
    
    module.exports = {
        ...fabric.stylelint,
        rules: {
            // your rules
        },
    }


解决 eslint 和 prettier 冲突
1、使用 eslint-config-prettier 来关掉 (disable) 所有和 Prettier 冲突的 ESLint 的配置，这一步umi-fabric已经帮我们做过了。
2、（可选）再启用 eslint-plugin-prettier ，将 prettier 的 rules 以插件的形式加入到 ESLint 里面，讲prettier的报错内容以eslint的方式提示出来。
这里插一句，为什么"可选" ？当你使用 Prettier + ESLint 的时候，其实格式问题两个都有参与，disable ESLint 之后，其实格式的问题已经全部由 prettier 接手了。那我们为什么还要这个 plugin？其实是因为我们期望报错的来源依旧是 ESLint ，使用这个，相当于把 Prettier 推荐的格式问题的配置以 ESLint rules 的方式写入，这样相当于可以统一代码问题的来源。

yarn add eslint-plugin-prettier -D

在.eslintrc.js加入
    "plugins": ["prettier"],
    "rules": {
        "prettier/prettier": "error"
    }
随机会带来一个问题，就是window / mac文件格式问题 “Delete CR”, 解决方式，将文件格式由CRLF改为LF即可。

解决 stylelint 和 prettier 冲突
1、使用 stylelint-config-prettier 来关掉 (disable) 所有和 Prettier 冲突的 stylelint 的配置，这一步umi-fabric已经帮我们做过了。