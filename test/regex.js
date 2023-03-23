/**
 * 입력값의 검사를 수행하기 위한 객체
 */

// alert("연결은 잘됨!");

var regex = {
    /**
     * 값의 존재 여부를 검사한다.
     * @param  {string} selector 입력요소의 css셀렉터
     * @param  {string} msg      값이 없을 경우 표시될 메시지
     * @return 입력된 경우 true / 입력되지 않은 경우 false
     */
    value: function(selector, msg) {
        let target = $(selector);
        if (!target.val()) {
            alert(msg);
            return false;
        }
        return true; 
    },

    /**
     * 입력값이 지정된 글자수를 초과했는지 검사한다.
     * @param  {string} selector 입력요소의 css셀렉터
     * @param  {int} len         최대 글자수
     * @param  {string} msg      값이 없을 경우 표시될 메시지
     * @return 초과하지 않은 경우 true / 초과한 경우 false
     */
    max_length: function(selector, len, msg) {
        let target = $(selector);
        if(target.val().length>len){
            alert(msg);
            return false;
        }
        return true;
    },

    /**
     * 입력값이 지정된 글자수 미만인지 검사한다.
     * @param  {string} selector 입력요소의 css셀렉터
     * @param  {int} len         최소 글자수
     * @param  {string} msg      값이 없을 경우 표시될 메시지
     * @return 지정된 글자수 이상인 경우 true / 미만인 경우 false
     */
    min_length: function(selector, len, msg) {
        let target = $(selector);
        if(target.val().length<len){
            alert(msg);
            return false;
        }
        return true;
    },

    /**
     * 체크박스나 라디오가 선택되어 있는지 검사한다.
     * @param  {string} selector 입력요소의 css셀렉터
     * @param  {string} msg      값이 없을 경우 표시될 메시지
     * @return 체크된 경우 true / 체크되지 않은 경우 false
     */
    check: function(selector, msg) {
        let checked = $(selector+':checked');
        if(checked.length<1){
            alert(msg);
            return false;
        }
        return true;
    },

    /**
     * 체크박스나 라디오의 최소 선택 갯수를 검사한다.
     * @param  {string} selector 입력요소의 css셀렉터
     * @param  {int} min         최소 선택 갯수
     * @param  {string} msg      검사에 실패한 경우 표시할 메시지
     * @return 최소 수량 이상인 경우 true / 그렇지 않은 경우 false
     */
    check_min: function(selector, min, msg) {
        let checked = $(selector+':checked');
        if(checked.length<min){
            alert(msg);
            return false;
        }
        return true;
    },

    /**
     * 체크박스나 라디오의 최대 선택 갯수를 검사한다.
     * @param  {string} selector 입력요소의 css셀렉터
     * @param  {int} max         최대 선택 갯수
     * @param  {string} msg      검사에 실패한 경우 표시할 메시지
     * @return 최대 수량 이하인 경우 true / 그렇지 않은 경우 false
     */
    check_max: function(selector, max, msg) {
        let checked = $(selector+':checked');
        if(checked.length>max){
            alert(msg);
            return false;
        }
        return true;
    },

    /**
     * 두 요소의 입력값이 동일한지 검사한다.
     * @param  {string} origin  원본 요소의 selector
     * @param  {string} compare 검사 대상 요소의 selector
     * @param  {string} msg     검사에 실패할 경우 표시할 메시지
     * @return 동일한 경우 true / 다른 경우 false
     */
    compare_to: function(origin, compare, msg) {
        let originSrc = $(origin);
        let compareSrc = $(compare)
        if(originSrc.val()!=compareSrc.val()){
            alert(msg);
            return false;
        }
        return true;
    },

    /**
     * 입력값이 정규표현식을 충족하는지 검사한다.
     * @param  {string} selector   검사대상의 셀렉터
     * @param  {string} msg        표시할 메시지
     * @param  {object} regex_expr 검사할 정규표현식
     * @return 표현식을 충족할 경우 true / 그렇지 않을 경우 false
     */
    // field는 활용하셔도 되고 무시하시고 진행하셔도 됩니다:)

    field: function(selector, msg, regex_expr) {
        let target = $(selector);
        if(!target.val()|| !regex_expr.test(target.val())) {  
            alert(msg);
            return false;
        }
        return true;
    },

    /** 아래의 함수들은 정규표현식 검사 함수에게 검사대상과 검사할 표현식을 전달한다. */
    // 숫자로만 이루어 졌는지 검사
    num: function(selector, msg) {
        return this.field(selector, msg,/^[0-9]*$/);

    },

    // 영문으로만 이루어 졌는지 검사
    eng: function(selector, msg) {
        return this.field(selector, msg,/^[a-zA-Z]*$/);

    },

    // 한글로만 이루어 졌는지 검사
    kor: function(selector, msg) {
        return this.field(selector, msg, /^[ㄱ-ㅎ가-힣0-9]*$/);
    },

    // 영문과 숫자로 이루어 졌는지 검사
    eng_num: function(selector, msg) {
        return this.field(selector, msg, /^[a-zA-Z0-9]*$/);
    },

    // 한글과 숫자로만 이루어 졌는지 검사
    kor_num: function(selector, msg) {
        return this.field(selector, msg, /^[ㄱ-ㅎ가-힣0-9]*$/);
    },

    // 이메일주소 형식인지 검사
    email: function(selector, msg) {
        return this.field(selector, msg,
            /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i);
    },

    // 핸드폰 번호 형식인지 검사
    cellphone: function(selector, msg) {
        return this.field(selector, msg, /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/);
    },

    // 집전화 형식인지 검사
    telphone: function(selector, msg) {
        return this.field(selector, msg, /^\d{2,3}\d{3,4}\d{4}$/);
    },
    
    // 주민번호 형식인지 검사
    jumin: function(selector, msg) {
        return this.field(selector, msg, /^\d{6}[1-4]\d{6}/);
    },

    /**
     * 핸드폰번호 형식과 집전화 번호 형식 둘중 하나를 충족하는지 검사
     * @param  {string} selector 검사 대상의 selector
     * @param  {string} msg      조건을 충족하지 않을 경우 표시할 메시지
     * @return 조건에 충족할 경우 true / 그렇지 않을 경우 false
     */
    phone: function(selector, msg) {
        let target = $(selector);
        let check1 = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
        let check2 = /^\d{2,3}\d{3,4}\d{4}$/;

        if (!target.val() || (!check1.test(target.val()) && !check2.test(target.val()))) {
            alert(msg);
            return false;
        }
        return true;
    }
};