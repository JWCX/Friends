export default (groupPosts = {
	1:{
		id: 1,
        title: "pooh bear",
        content: '{"blocks":[{"key":"2hnb6","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"5qbeh","text":" ","type":"atomic","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":1,"key":0}],"data":{}},{"key":"3l9bq","text":"HELLO WORLD","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"eqr9l","text":"hello world","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"1da06","text":"-_=+[}","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"anpme","text":"아름다운 🗺️입니다","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":5,"length":2,"key":1}],"data":{}},{"key":"8v1fq","text":"❤️ 🦄 ","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":2,"key":2},{"offset":3,"length":1,"key":3}],"data":{}},{"key":"5uevr","text":" ","type":"atomic","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":1,"key":4}],"data":{}},{"key":"7v888","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{"0":{"type":"MAP","mutability":"IMMUTABLE","data":{"link":"http://map.daum.net/?mapJson=%7B%22mapCenterX%22%3A495555%2C%22mapCenterY%22%3A1130905%2C%22mapLevel%22%3A4%2C%22coordinate%22%3A%22wcongnamul%22%2C%22map_type%22%3A%22TYPE_MAP%22%2C%22map_hybrid%22%3A%22false%22%2C%22markInfo%22%3A%5B%7B%22coordinate%22%3A%22wcongnamul%22%2C%22x%22%3A495559.9999999077%2C%22y%22%3A1130907.0000000007%7D%5D%7D","mapSrc":"http://map2.daum.net/map/imageservice?IW=900&IH=600&MX=495555&MY=1130905&SCALE=5&CX=495559&CY=1130907&service=open","data":{"address_name":"서울 종로구 청진동 146","category_group_code":"","category_group_name":"","category_name":"가정,생활 > 패션 > 의류판매","distance":"529","id":"15586256","phone":"02-2075-7082","place_name":"A-ing","place_url":"http://place.map.daum.net/15586256","road_address_name":"서울 종로구 종로 19","x":"126.979896285169","y":"37.5708050195651"},"width":63,"alignment":"right"}},"1":{"type":"emoji","mutability":"IMMUTABLE","data":{"emojiUnicode":"🗺️"}},"2":{"type":"emoji","mutability":"IMMUTABLE","data":{"emojiUnicode":"❤️"}},"3":{"type":"emoji","mutability":"IMMUTABLE","data":{"emojiUnicode":"🦄"}},"4":{"type":"MAP","mutability":"IMMUTABLE","data":{"link":"http://map.daum.net/?mapJson=%7B%22mapCenterX%22%3A498910%2C%22mapCenterY%22%3A1130070%2C%22mapLevel%22%3A4%2C%22coordinate%22%3A%22wcongnamul%22%2C%22map_type%22%3A%22TYPE_MAP%22%2C%22map_hybrid%22%3A%22false%22%2C%22markInfo%22%3A%5B%7B%22coordinate%22%3A%22wcongnamul%22%2C%22x%22%3A498913.0795874748%2C%22y%22%3A1130071.2302336376%7D%5D%7D","mapSrc":"http://map2.daum.net/map/imageservice?IW=900&IH=600&MX=498910&MY=1130070&SCALE=5&CX=498913&CY=1130071&service=open","data":{"address_name":"서울 중구 산림동 225-2","category_group_code":"","category_group_name":"","category_name":"서비스,산업 > 제조업 > 전기,전자 > 전기자재,부품","distance":"1522","id":"24529823","phone":"02-2275-7599","place_name":"토탈A+LED","place_url":"http://place.map.daum.net/24529823","road_address_name":"서울 중구 을지로19길 27","x":"126.99507877056915","y":"37.56779452944365"},"width":100}}}}',
        writedate: new Date(),
        user: {
            id: 2,
            nickName: "kim",
            image: "http://picsum.photos/100/100",
        },
        views: 253041,
        likes: 3145,
        liked: true,
        comments: {
            1: {
                id: 1,  // 댓글 id
                user: {
                    id: 1,  // 댓글 작성자 id
                    nickName: "따봉kim",  // 댓글 작성자 닉네임
                    image: "http://picsum.photos/100,101",
                },
                content: '{"blocks":[{"key":"1eqld","text":"옛다 따봉이나 먹어라👍 ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":11,"length":1,"key":0}],"data":{}}],"entityMap":{"0":{"type":"emoji","mutability":"IMMUTABLE","data":{"emojiUnicode":"👍"}}}}',  // 댓글 내용
                writedate: new Date()  // 댓글 작성일
            },
            2: {
                id: 2,  // 댓글 id
                user: {
                    id: 2,  // 댓글 작성자 id
                    nickName: "replyyy",  // 댓글 작성자 닉네임
                    image: "http://picsum.photos/101,101",
                },
                content: '{"blocks":[{"key":"ltiv","text":" 잘보고갑니다 😉 ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":8,"length":1,"key":0}],"data":{}}],"entityMap":{"0":{"type":"emoji","mutability":"IMMUTABLE","data":{"emojiUnicode":"😉"}}}}',  // 댓글 내용
                writedate: new Date()  // 댓글 작성일
            },
		}
	},
	2:{
		id: 2,
        title: "pooh bear",
        content: '{"blocks":[{"key":"ebr6j","text":"www.naver.com","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        writedate: new Date(),
        user: {
            id: 2,
            nickName: "kim",
            image: "http://picsum.photos/100/100",
        },
        views: 253041,
        likes: 3145,
        liked: true,
        comments: {
            1: {
                id: 1,  // 댓글 id
                user: {
                    id: 1,  // 댓글 작성자 id
                    nickName: "따봉kim",  // 댓글 작성자 닉네임
                    image: "http://picsum.photos/100,101",
                },
                content: '{"blocks":[{"key":"1eqld","text":"옛다 따봉이나 먹어라👍 ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":11,"length":1,"key":0}],"data":{}}],"entityMap":{"0":{"type":"emoji","mutability":"IMMUTABLE","data":{"emojiUnicode":"👍"}}}}',  // 댓글 내용
                writedate: new Date()  // 댓글 작성일
            },
            2: {
                id: 2,  // 댓글 id
                user: {
                    id: 2,  // 댓글 작성자 id
                    nickName: "replyyy",  // 댓글 작성자 닉네임
                    image: "http://picsum.photos/101,101",
                },
                content: '{"blocks":[{"key":"ltiv","text":" 잘보고갑니다 😉 ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":8,"length":1,"key":0}],"data":{}}],"entityMap":{"0":{"type":"emoji","mutability":"IMMUTABLE","data":{"emojiUnicode":"😉"}}}}',  // 댓글 내용
                writedate: new Date()  // 댓글 작성일
            },
		}
	},
}, action) => {
	switch (action.type) {
		case "OPEN_GROUP_PAGE":
		case "CLOSE_GROUP_PAGE":
		case "GET_GROUP_POSTS":
		case "UPDATE_GROUP_POSTS":
			return action.groupPosts;
		case "CLEAR_GROUP_POSTS":
			return null;
		default:
			return groupPosts;
	}
}