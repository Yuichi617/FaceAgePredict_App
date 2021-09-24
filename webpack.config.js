const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // htmlのテンプレート指定用
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // バンドル後cssファイル出力用

module.exports = {
    mode: 'development', // バンドルのモード {開発モード: development, 本番モード: production}
    devtool: 'inline-source-map', //出力ファイルにソースマップを含める
    entry: './src/index.tsx', 
    output: {
        path: __dirname + '/public', //publicフォルダに出力
      },
    module: {
        rules: [
            { // TypeScriptのコンパイル設定
                test: [/\.ts$/, /\.tsx$/],
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ]
            },
            { // cssのコンパイル設定
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader, // CSSファイルを書き出すオプションを有効にする
                  {
                    loader: 'css-loader',
                    options: { url: false }
                  },
                ],
            },
        ]
    },
    plugins: [ 
        new HtmlWebpackPlugin({ // htmlのテンプレートを指定
          template: path.resolve(__dirname, "src/index.html"),
        }),
        new MiniCssExtractPlugin({ // バンドルしたcssをpublic/css/style.cssに出力
            filename: 'css/style.css',  
        })
    ],
    resolve: { // importにおける拡張子の省略設定
        modules: [path.resolve(__dirname, "node_modules")],
        extensions: [".ts", ".tsx", ".js"],
    },
    target: ["web", "es5"], // ES5(IE11等)向けの指定（webpack5以上で必要）
    devServer: { // 開発用サーバの設定
        static: {
            directory: path.join(__dirname, 'public'),
          },
        port: 9000, // ポート番号の指定
        watchFiles: ['src/**/*'], // ファイルの変更があるたびに更新
      },
  };