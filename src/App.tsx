import React, { useState, useEffect } from "react"
import './css/reset.css'
import './css/style.css'
import NoImage from './images/no_image.jpg'

const App = () => {

    const [send_img, setImage] = useState<File>()
    const [preview, setPreview] = useState<string>(NoImage)
    const [pre_age, setPreAge] = useState<String>("???")

    var onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if(!e.target.files) return
        const img: File = e.target.files[0];
        setImage(img);

        setPreview(window.URL.createObjectURL(img));
    }

    var sendImg = (): void => {
        console.log("send");
        if(!send_img) { // アップロードなしでボタンを押した時(テスト用)

            // requestの作成
            const test_requestOptions ={
                method: 'POST',
                headers:{'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                body: JSON.stringify({Name: "hogehoge"}),
            };
            const test_url = "http://127.0.0.1:8080/post_test";

            //　request送信、response処理
            fetch(test_url, test_requestOptions
            ).then((response)=> response.json()
            ).then((responseJson) =>{
                console.log(responseJson)
            })
        } else { // 画像データをAPI(Flask)へ送信
            // requestの作成
            const url = "http://127.0.0.1:8080/face-age-predict"
            const requestOptions ={
                method: 'POST',
                headers:{'Content-Type': 'application/octet-stream', 'Access-Control-Allow-Origin': '*'},
                body: send_img,
            };

            //　request送信、response処理
            fetch(url, requestOptions
                ).then(response => response.json()
                ).then(data => {
                    console.log(data);
                    setPreAge(String(data.prediction))}
                ).catch((error)=>{console.error(error);
                });
        }
    }

    useEffect(() => {
        console.log("preage: " + pre_age);
    }, [pre_age]);

    return (
        <div className="main-container">
            <h1>Face-age Prediction</h1>
            <div className="wrapper_3">
                <p>推定年齢: {pre_age}歳</p>
            </div>
            <div className="wrapper_1">
                <img src={preview} />
                <p>アップロードするファイルを選択してください(フォーマット: jpg、png)</p>
                <div className="input_btn">
                    <input type='file' accept="image/*" onChange={onFileInputChange}/>
                </div>
            </div>
            <div className="wrapper_2">
                <button onClick={sendImg}>送信</button>
            </div>
        </div>
    )
}
export default App