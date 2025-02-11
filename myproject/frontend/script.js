 /*
    백엔드 API에서 주식 데이터를 가져와 웹페이지에 표시, 비동기 함수
    비동기 함수(코드가 끝날 때까지 코드의 실행을 멈추지 않고 다음 코드를 먼저 실행하는 것
    여러 개의 작업을 진행할 때 한 작업이 끝날 때까지 기다리지 않고 동시에 실행)

    이 기능이 중요한 이유는, 데이터를 서버에서 가져오는 fetch 작업이 시간이 걸리기 때문이다.
    웹사이트는 고객의 요청에 맞추어 실시간으로 반응해야 하는데, 동기 함수를 사용하면 데이터를 처리하는 동안
    웹사이트가 멈출 수도 있다.

    const는 변경되지 않는 값을 저장할 때 사용한다. 위 코드에서 response 변수는 fetch를 통해 한 번만 값을 할당하고, 이후 변경하지 않음이 보장된다.
    코드의 안정성을 높일 수 있다. const의 경우 속성변경만 가능하고 변수의 재할당은 안된다. 

    fetch()는 웹에서 데이터를 요청하는 함수이다. 내부 인자로 쓰인 링크는 요청을 보내는 사이트의 주소이다.
    await는 비동기 작업이 완료될 때까지 기다리도록 하는 키워드이다. 
    fetch 하는데 걸리는 시간동안 await를 사용해서 데이터가 완전히 받아들여질 때까지 기다린다.
    이것을 설정하는 이유는 fetchStockData가 비동기 함수이기 때문에, 비동기 함수 내부에서 기다리는 코드를 만들어주는 것이다. 
    fetch 이후에 데이터를 가공하는 작업이 있을 경우, 데이터를 모두 읽을 때까지 기다려야 오류가 안난다.

    브라우저의 개발자 도구(Chrome F12 -> Console 탭)에 데이터를 출력한다.
    서버에서 받은 데이터가 어떤 형태인지 확인하기 위한 코드이다.
    가져온 주식 데이터에 문제가 있는 경우, 이 부분을 확인해서 문제를 수정할 수 있다.

    fetch를 이용해 가져온 데이터를 서버가 JSON(JavaScript Object Notation)의 형식으로 바꾼다.

    document.getElementById("stock-data")는 HTML 문서에서 id = "stock-data"인 요소를 찾아서 반환하는 javaScript함수이다.
    즉, stockinfo를 HTML 문서의 id='stock-data'에 저장
    html은 현재 로드된 html 문서를 인식 (html 코드에 java를 불러오는 부분이 있음)

    document.addEventListener("이벤트이름", 실행할 함수);

    이벤트란 웹 브라우저에서 발생하는 특정한 상황을 의미한다. 
    (click -> 사용자가 마우스로 클릭했을 때, 
    keydown -> 키보드를 눌렀을 때, 
    DOMContentLoaded -> HTML 문서가 완전히 로드되었을 때, 
    mouseover -> 사용자가 마우스를 요소 위에 울렸을 때,
    submit -> 사용자가 폼(form)을 제출했을 때
    )

    즉, 위 함수는 DOMContentLoaded이벤트가 발생한 후에, 함수를 실행한다.
    function()은 익명함수로서, 중괄호 내부에 있는 함수들을 포함하는 함수의 역할을 한다. 
    이벤트리스너나 콜백함수에서 자주 사용된다. 

    실행 흐름 요약
    웹페이지가 로드됨 → DOMContentLoaded 이벤트 실행
    fetchStockData("005930.KQ")가 호출됨
    백엔드(http://localhost:8000/stock/005930.KQ)에 API 요청을 보냄
    API에서 JSON 데이터를 받아옴
    받아온 데이터를 웹페이지에 표시 (innerText)

    data를 위의 형태로 가공
        data.data["Open"] = {"2025-02-11: 55500"} dictionary 형태
        Object.keys(data.data["Open"])[0] -> "2025-02-11" key 추출
        Object.values(data.data["Open"])[0] -> 55500 value 추출

    */
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
    fetchStockData("005930.KS");  // 삼성전자 데이터 가져오기

});