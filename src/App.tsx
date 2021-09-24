import React, { useState } from "react"
import './css/reset.css'
import './css/style.css'

const App = () => {

    const [send_img, setImage] = useState<File>()

    var onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if(!e.target.files) return // filesがnullとなる可能性を消す
        const img: File = e.target.files[0];
        setImage(img);
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
                ).then(data => {console.log(data);}
                ).catch((error)=>{console.error(error);
                });
        }
    }

    return (
        <div>
            <div>
                <label>アップロードするファイルを選択してください</label>
                <input type='file' accept="image/*" onChange={onFileInputChange}/>
            </div>
            <div>
                <button onClick={sendImg}>送信</button>
            </div>
        </div>
    )
}
export default App