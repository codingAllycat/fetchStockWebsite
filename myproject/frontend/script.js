console.log("script.js가 실행되었습니다!");
async function fetchStockData(symbol) { 
    console.log(`fetchStockData 실행됨: ${symbol}`);  // 함수 실행 확인

    try {
        const response = await fetch(`http://127.0.0.1:8000/stock/${symbol}`);
        console.log("API 요청 보냄:", response);

        const data = await response.json();
        console.log("API 응답 데이터:", data);  // 데이터가 제대로 왔는지 확인

        if (!data.data || Object.keys(data.data).length === 0) {
            document.getElementById("stock-symbol").innerText = "데이터를 불러올 수 없습니다.";
            document.getElementById("stock-data").innerHTML = "";
            return;
        } // 오류
 
        document.getElementById("stock-symbol").innerText = `종목: ${data.symbol}`;
        const dateKey = Object.keys(data.data["Open"])[0];  // 가장 첫 번째 날짜를 가져옴
        const stockInfo = `
            <tr>
                <td>${dateKey}</td>
                <td>${data.data["Open"][dateKey]}</td>
                <td>${data.data["High"][dateKey]}</td>
                <td>${data.data["Low"][dateKey]}</td>
                <td>${data.data["Close"][dateKey]}</td>
                <td>${data.data["Volume"][dateKey]}</td>
            </tr>
        `;       

        console.log("테이블에 추가할 데이터:", stockInfo);  // 데이터 확인
        document.getElementById("stock-data").innerHTML = stockInfo; 
    } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
        document.getElementById("stock-symbol").innerText = "데이터를 불러오는 중 오류가 발생했습니다.";
        document.getElementById("stock-data").innerHTML = "";
    }

}

// 페이지가 로드되면 실행, 페이지가 로드될 때 fetchStockData("005930.KQ")를 실행해 삼성전자 데이터를 가져옴.
document.addEventListener("DOMContentLoaded", function() {
    console.log("script.js가 실행되었습니다!");
    fetchStockData("005930.KS");  // 삼성전자 데이터 가져오기

});
