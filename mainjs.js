const $=document.querySelector.bind(document)
const $$ =document.querySelectorAll.bind(document)
const togglePlay=$('.btn-toggle-play')
const playbtn=$('.player')

const app={
    
    currentIndex:0,
    isPlaying:false,
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
        const htmls =this.song.map(song=>{
            return `
            <div class="song">
                <div class="thumb" style="background-image: url(${song.img})">
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
            

            
        }
    },
    loadCurrentSong:function()
    {
        const heading=$('header h2')
        const cdThumb=$('.cd-thumb')
        const audio= $('#audio')
        console.log(audio)
        heading.textContent=this.current.name
        cdThumb.style.backgroundImage=`url('${this.current.img}')`
        audio.src=this.current.path

        
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
