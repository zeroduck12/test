<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<h3>Ajax 요청 보내기 테스트</h3>
	<input type="submit" value="Get방식으로 보내기" onclick="send1();">
	<input type="submit" value="Post방식으로 보내기" onclick="send2();">
	<p id="result"></p>
	
	<script>
		function send1(){
			let xhr = new XMLHttpRequest();
			xhr.open("GET", "request_ajax.jsp?userid=apple&userpw=1234", true);
			xhr.send();
			xhr.onreadystatechange = function(){
				// 통신 성공
				if( xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200 ){
					document.getElementById("result").innerHTML= xhr.responseText;
// 					alert(xhr.responseText);
				}
			}
		}
		
		function send2(){
			let xhr = new XMLHttpRequest();
			xhr.open("POST", "request_ajax.jsp", true);
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.send("userid=admin&userpw=abcdefg");
			xhr.onreadystatechange = function(){
				if( xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200 ){
					document.getElementById("result").innerHTML= xhr.responseText;
				}
			}
		}
	
	</script>
</body>
</html>











