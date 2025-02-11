"""
FastAPI는 Python을 이용해 웹 API를 쉽게 만들 수 있게 해주는 프레임워크
위 코드는 FastAPI 객체를 실행. FastAPI는 class이며, 이 class를 생성하는 함수

@는 decorator. decorator는 함수나 클래스를 감싸서 추가 기능을 부여하는 역할을 수행한다.
@app.get("/실행됨!")
        func()")
def home():
    return {message: "Hello, FastAPI!"}

    에서 @app.get("/")은 home()함수를 FastAPI의 GET요청과 연결하는 역할을 한다. 
    / 경로로 요청이 오면 실행할 함수를 정의하는 부분이다. 

    



decorator를 쓰면, 기존 함수를 수정하지 않고 새로운 기능을 추가할 수 있다. (함수가 실행되기 전, 중, 후)

def my_decorator(func):
    def wrapper():
        print("함수가 실행되기 전에 
        print("함수가 실행된 후에 실행됨!")
    return wrapper

@my_decorator  # ← 데코레이터 적용
def say_hello():
    print("Hello, World!")

say_hello()
의 코드를 살펴보면, wrapper라는 함수가 func 전, 중, 후에 어떤 함수를 실행시킬 것인지를 표시하고 있다.
@my decorator 아래의 코드가 func에 기능을 추가한다. 




CORS(Cross-Origin Resource Sharing) 정책은 보안을 위해 웹 브라우저가 다른 출처(Origin)에서 리소스를 요청할 때
이를 제한하는 정책이다. 이는 내 컴퓨터가 막는 것이므로 코드 상에서 풀어줘야 한다.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import yfinance as yf

app = FastAPI()

# CORS 미들웨어 추가
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 모든 출처에서의 요청을 허용
    allow_credentials=True,
    allow_methods=["*"],  # 모든 HTTP 메서드 허용
    allow_headers=["*"],  # 모든 헤더 허용
)

@app.get("/stock/{symbol}")
def get_stock_data(symbol: str):
    ticker = yf.Ticker(symbol)
    data = ticker.history(period="1d")
    return {"symbol": symbol, "data": data.to_dict()}

# 서버 실행: `uvicorn main:app --reload
