var videoList=document.getElementById('video-list');
var videoPlayer=document.getElementById('video-player')

var xhttpTwo=new XMLHttpRequest()
xhttpTwo.open('GET','http://5d76bf96515d1a0014085cf9.mockapi.io/video/1',true)
xhttpTwo.send()
xhttpTwo.onreadystatechange=function(){
    if(this.readyState===4){
        var objFromBackend=JSON.parse(this.responseText)
        var iframeDIV=document.createElement('div')
        iframeDIV.className='iframe-div'
        iframeDIV.id='iframe'+objFromBackend.id
        var videoClip=document.createElement('iframe')
        videoClip.className='video-clip'
        var vimeoNumber=objFromBackend.vimeoId
        videoClip.src="https://player.vimeo.com/video/"+vimeoNumber
        iframeDIV.appendChild(videoClip) 
        var videoName=document.createElement('h1')
        videoName.className='video-name'
        videoName.innerText=objFromBackend.title
        iframeDIV.appendChild(videoName)
        var videoDetails=document.createElement('p')
        videoDetails.className='video-details'
        videoDetails.innerText=objFromBackend.description
        iframeDIV.appendChild(videoDetails)
        videoPlayer.appendChild(iframeDIV)
        localStorage.setItem('existing-video',JSON.stringify(objFromBackend))
        localStorage.setItem('division-id','1')

    }
}

function createVideoList(obj){
    var playList=document.createElement('div')
    playList.className='play-list'
    playList.id=obj.id
    var videoImage=document.createElement('img')
    videoImage.className='video-Image'
    videoImage.src=obj.thumbnail
    playList.appendChild(videoImage);
    var videoTitle=document.createElement('p')
    videoTitle.className='video-title'
    videoTitle.innerHTML=obj.title
    playList.appendChild(videoTitle)
    videoImage.onclick=function(){
    var xhttp=new XMLHttpRequest()
    var id=obj.id
    var apiEndPoint='http://5d76bf96515d1a0014085cf9.mockapi.io/video/'+id
    xhttp.open('GET',apiEndPoint,true)
    xhttp.send()
    xhttp.onreadystatechange=function(){
        if(this.readyState===4){
            var getExtngObj=JSON.parse(localStorage.getItem('existing-video'))
            var videoID='iframe'+getExtngObj.id
            var getExtngId=localStorage.getItem('division-id')
            var extngDiv=document.getElementById(getExtngId)
            extngDiv.classList.remove('video-clip-class')
            var extngVideo=document.getElementById(videoID)
            extngVideo.remove()
            var objectFromBackend=JSON.parse(this.responseText)
            var iframeDIV=document.createElement('div')
            iframeDIV.className='iframe-div'
            iframeDIV.id='iframe'+objectFromBackend.id
            var videoClip=document.createElement('iframe')
            videoClip.className='video-clip'
            playList.classList.add('video-clip-class')
            var vimeoNumber=objectFromBackend.vimeoId
            videoClip.src="https://player.vimeo.com/video/"+vimeoNumber
            iframeDIV.appendChild(videoClip)  
            var videoName=document.createElement('h1')
            videoName.className='video-name'
            videoName.innerText=objectFromBackend.title
            iframeDIV.appendChild(videoName)
            var videoDetails=document.createElement('p')
            videoDetails.className='video-details'
            videoDetails.innerText=objectFromBackend.description
            iframeDIV.appendChild(videoDetails)
            videoPlayer.appendChild(iframeDIV)
            localStorage.setItem('existing-video',JSON.stringify(objectFromBackend))
            localStorage.setItem('division-id',id)      
        }
    }
    }
    return playList;
    }

    
var xhttp=new XMLHttpRequest()
var apiEndPoint="http://5d76bf96515d1a0014085cf9.mockapi.io/playlist"
xhttp.open("GET",apiEndPoint,true)
xhttp.send()
xhttp.onreadystatechange=function(){
    if(this.readyState===4){
    var arrayFromBackend=JSON.parse(this.responseText);
    console.log(arrayFromBackend)
    for(var i=0; i<arrayFromBackend.length; i++){
        videoList.appendChild(createVideoList(arrayFromBackend[i]))
    }
}
}


