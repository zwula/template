# umi project

# 一、项目搭建

### 使用 nvm 来管理 node 版本   

    nvm -v 1.1.7
    node -v 14.14.0

### 使用 yarn 管理 npm 依赖，并使用国内源

安装yarn并使用国内源  

    $ npm i yarn tyarn -g

### 通过umijs3.x版本官方工具创建项目

    yarn create @umijs/umi-app

### 安装依赖

    yarn


# 二、初始目录结构

    /mock
    /src
        /.umi 临时文件，由umi自动生成
        /components 非路由组件
        /models 数据层
        /pages 路由组件
        /services 请求文件
        /utils 工具文件
        app.tsx 运行时配置文件，先于入口文件运行，运行顺序：global.tsx > app.tsx > umi.ts
        global.less 全局样式
        global.tsx 全局逻辑
    .env 正式环境变量
    .env.development 开发环境变量
    .gitignore
    .prettierignore
    .prettierc  prettier配置文件，后续删除，使用umijs/fabric代替
    .umirc.ts 约定式配置
    README.md
    tsconfig.json
    typings.d.ts


# 三、项目配置
### 配置umi-fabric
umi 维护了一个 prettier，eslint，stylelint 的配置文件合集 umi-fabric

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

Ⅰ 解决 eslint 和 prettier 冲突
①使用 eslint-config-prettier 来关掉 (disable) 所有和 Prettier 冲突的 ESLint 的配置，这一步umi-fabric已经帮我们做过了。
②（可选）再启用 eslint-plugin-prettier ，将 prettier 的 rules 以插件的形式加入到 ESLint 里面，讲prettier的报错内容以eslint的方式提示出来。
这里插一句，为什么"可选" ？当你使用 Prettier + ESLint 的时候，其实格式问题两个都有参与，disable ESLint 之后，其实格式的问题已经全部由 prettier 接手了。那我们为什么还要这个 plugin？其实是因为我们期望报错的来源依旧是 ESLint ，使用这个，相当于把 Prettier 推荐的格式问题的配置以 ESLint rules 的方式写入，这样相当于可以统一代码问题的来源。

    yarn add eslint-plugin-prettier -D

在.eslintrc.js加入

    "plugins": ["prettier"],
    "rules": {
        "prettier/prettier": "error"
    }

随即会带来一个问题，就是window / mac文件格式问题 “Delete CR”, 解决方式，将文件格式由CRLF改为LF即可。

Ⅱ 解决 stylelint 和 prettier 冲突
①使用 stylelint-config-prettier 来关掉 (disable) 所有和 Prettier 冲突的 stylelint 的配置，这一步umi-fabric已经帮我们做过了。

### 配置pre-commit

当项目中存在eslint式报错，阻止commit

    "gitHooks": {
        "pre-commit": "lint-staged"
    },
    "lint-staged": {
        "*.{less,md,json}": [
            "prettier --write"
        ],
        "*.js?(x)": [
            "prettier --write",
            "eslint --fix"
        ],
        "*.ts?(x)": [
            "prettier --parser=typescript --write",
            "eslint --fix"
        ]
    },


### 配置commitlint, 对commit提交信息进行格式校验

配置commitlint需要使用到husky，安装husky 和 commitlint插件

    yarn add husky @commitlint/config-conventional @commitlint/cli -D

添加配置文件（注意格式，可以直接复制）

    echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js 

配置husky&commitlint时，需要手动启用husky一次

    npx husky install

配置husky&commitlint完成后，不可能每次 install 之后都手动去启用husky，例如，如果开发A配置好了并提交，开发B拉下代码，装完依赖后如果还需要去手动启用，就很不合理。因此在package.json的里面添加如下配置：

    "prepare": "husky install" 
    
使每次安装完husky后自动启动husky

生成husky的commit-msg配置文件（执行完这一步，根目录会创建一个 .husky目录）

    npx husky add .husky/commit-msg

向新生成的commit-msg文件中添加  npx --no-install commitlint --edit

commit—message提交格式如下：

<!-- <type>(<scope>): <subject> -->
<!-- <BLANK LINE> -->
<!-- <body> -->
<!-- <BLANK LINE> -->
<!-- <footer> -->

build：主要目的是修改项目构建系统(例如 glup，webpack，rollup 的配置等)的提交
ci：主要目的是修改项目继续集成流程(例如 Travis，Jenkins，GitLab CI，Circle等)的提交
docs：文档更新
feat：新增功能
merge：分支合并 Merge branch ? of ?
fix：bug 修复
perf：性能, 体验优化
refactor：重构代码(既没有新增功能，也没有修复 bug)
style：不影响程序逻辑的代码修改(修改空白字符，格式缩进，补全缺失的分号等，没有改变代码逻辑)
test：新增测试用例或是更新现有测试
revert：回滚某个更早之前的提交
chore：不属于以上类型的其他类型

注意： 安装并配置了husky后，package.json中的

    "gitHooks": {
        "pre-commit": "lint-staged"
    }

就会失效，因此需要再重新配置一下pre-commit

### 重新配置 pre-commit

生成husky的pre-commit配置文件

    npx husky add .husky/pre-commit

向新生成的pre-commit文件中添加  

    npx --no-install lint-staged

并删除package.json中

    "gitHooks": {
        "pre-commit": "lint-staged"
    }