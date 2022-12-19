const $=document.querySelector.bind(document)
const $$ =document.querySelectorAll.bind(document)
const togglePlay=$('.btn-toggle-play')
const playbtn=$('.player')
const progressbtn=$('.progress')
const heading=$('header h2')
const cdThumb=$('.cd-thumb')
const audio= $('#audio')
const next=$('.btn-next')
const prev=$('.btn-prev')
const randomBtn=$('.btn-random')
const repeatBtn=$('.btn-repeat')
const playlist= $('.playlist')
console.log(repeatBtn)

const app={
    
    currentIndex:0,
    isRepeat:false,
    isPlaying:false,
    isRandom:false,
    song:[
        {
            name:'Đố em biết anh đang nghĩ gì',
            singer:'Đen vâu',
            path:'mp3/song1.mp3',
            img:'img/song1.png'
    
        },
        {
            name:'Dù cho mai về sau',
            singer:'buitruonglinh',
            path:'mp3/song2.mp3',
            img:'img/song2.png',
        },
        {
            name:'Vô tình',
            singer:'Hoaprox',
            path:'mp3/song3.mp3',
            img:'img/song3.png',
        },
        {
            name:'Không thể cùng nhau suốt kiếp',
            singer:'Mr siro',
            path:'mp3/song4.mp3',
            img:'img/song4.png',
        },
        {
            name:'Yêu 5',
            singer:'Rhymastic',
            path:'mp3/song5.mp3',
            img:'img/song5.png',
        },
        {
            name:'Vài lần đốn đưa',
            singer:'Touliver',
            path:'mp3/song6.mp3',
            img:'img/song6.png',
        },
        {
            name:'3107 Album',
            singer:'W/n',
            path:'mp3/song7.mp3',
            img:'img/song7.png',
        }
    ],
    defineProperties: function() {
        Object.defineProperty(this,'current',{
            get:function(){
                return this.song[this.currentIndex]
            }
        })
    },
    render: function(){
        const htmls =this.song.map((song,index)=>{
            return `
            <div class="song ${index===this.currentIndex ?'active':''}" data-index="${index}">                <div class="thumb" style="background-image: url(${song.img})">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `
        })
        $('.playlist').innerHTML = htmls.join('')
    },
    
    handleEvent:function()
    {

        const _this=this
        const cd=$('.cd')
        const cdWidth=cd.offsetWidth
        
        document.onscroll=()=>{
            
            const scrollTop=window.scrollY||document.documentElement.scrollTop
            const newWidth=cdWidth-scrollTop;
             
            cd.style.width=newWidth >0? newWidth +'px':0
            cd.style.opacity=newWidth /cdWidth
            
        }
        togglePlay.onclick=()=>{
            if(_this.isPlaying==false)
            {
                
                audio.play()
                
            }
            else{
                
                audio.pause()
                
            }
        
        audio.onplay=()=>{
            _this.isPlaying=true
            playbtn.classList.add('playing')
        }
        audio.onpause=()=>{
            _this.isPlaying=false
            playbtn.classList.remove('playing')
            
        }
        audio.ontimeupdate=()=>{
            if(audio.duration)
            {
                const progress=Math.floor(audio.currentTime/audio.duration*100)
                progressbtn.value=progress
            }
        }

        progressbtn.onchange=(e)=>{
            const seekTime=e.target.value*audio.duration/100
            audio.currentTime=seekTime
            
            
        }
        next.onclick=()=>{
            if(this.isRandom)
        {
            _this.playRandom()
        }
        else{
            _this.nextSong()
        }
            audio.play()
            _this.render()
            _this.scrollToTop()
        }
        
        }
        prev.onclick=()=>{
            _this.prevSong();
            audio.play();
            _this.render()
            _this.scrollToTop()
        }
        randomBtn.onclick=(e)=>{
            _this.isRandom=!_this.isRandom
            randomBtn.classList.toggle('active',_this.isRandom)
        }
        audio.onended=()=>{
            if(_this.isRandom)
            {
                _this.playRandom()
            }
            if(_this.isRepeat)
            {
                _this.RepeatSong()
            }
            else{
                _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollToTop()
        }
        repeatBtn.onclick=()=>{
            _this.isRepeat=!_this.isRepeat
            repeatBtn.classList.toggle('active',_this.isRepeat)
        }
        playlist.onclick=(e)=>{
            let songNote=e.target.closest('.song:not(.active')
            if(songNote||e.target.closest('.option'))
            {
                if(songNote)
                {
                    _this.currentIndex=Number(songNote.dataset.index)
                    _this.loadCurrentSong()
                    audio.play()
                    _this.render()

                }
            }
        }
    },
    loadCurrentSong:function()
    {
        
        console.log(audio)
        heading.textContent=this.current.name
        cdThumb.style.backgroundImage=`url('${this.current.img}')`
        audio.src=this.current.path
        
        
    },
    nextSong:function()
    {
        this.currentIndex++;
        if(this.currentIndex>=this.song.length)
        {
            this.currentIndex=0;
        }
        
        this.loadCurrentSong()
        
    },
    prevSong:function()
    {
        this.currentIndex--;
        if(this.currentIndex<0)
        {
            this.currentIndex=this.song.length
        }
        this.loadCurrentSong()
    },
    playRandom:function()
    {
        let newIndex
        do{
            newIndex=Math.floor(Math.random()* this.song.length)
        }while(newIndex ===this.currentIndex)
        this.currentIndex=newIndex
        this.loadCurrentSong()
    },
    scrollToTop:function()
    {
        $('.song.active').scrollIntoView({
            behavior: 'smooth',
            block:'nearest',
        })
    },
    RepeatSong:function()
    {

        this.currentIndex
        this.loadCurrentSong()
    },
    start: function()
    {
        this.defineProperties()
        this.handleEvent()
        this.loadCurrentSong()
        this.render()
        
        
    }
    
}
app.start()

