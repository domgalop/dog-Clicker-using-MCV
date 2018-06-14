
/* ======= Model ======= */

let model = {
  
  currentDog: null,
  dogs: [
    {
      name: "Santa",
      img: "https://www.sbs.com.au/food/sites/sbs.com.au.food/files/styles/full/public/christmas-dog.jpg?itok=n7QECcXK",
      counter: 0
    },
    {
      name: "Loki",
      img: "https://www.cesarsway.com/sites/newcesarsway/files/styles/large_article_preview/public/Common-dog-behaviors-explained.jpg?itok=FSzwbBoi",
      counter: 0
    },
    {
      name: "Cachorros",
      img: "http://r.ddmcdn.com/w_830/s_f/o_1/cx_20/cy_1463/cw_2528/ch_1422/APL/uploads/2014/11/puppy-cam-veer-2893191.jpg",
      counter: 0
    },
    {
      name: "Blanco",
      img: "https://images.theconversation.com/files/205966/original/file-20180212-58348-7huv6f.jpeg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip",
      counter: 0
    },
    {
      name: "Toffe",
      img: "https://www.sciencedaily.com/images/2017/10/171019100944_1_900x600.jpg",
      counter: 0
    }
  ]
  
};

/* ======= Octopus ======= */

let octopus = {
  
  init(){
    model.currentDog = model.dogs[0];
    view.init();
  },
  
  getCurrentDog(){
    return model.currentDog;
  },
  
  getDogs(){
    return model.dogs;
  },
  
  setCurrentDog(dog) {
    model.currentDog = dog;
  },
  
  incrementCounter(){
    model.currentDog.counter++;
    view.renderCounter();
  }
  
}

/* ======= view ======= */

let view = {
  
  init(){
    // elementos que llamamos una ves 
    this.dogs = octopus.getDogs();
    this.imgContainer = document.getElementById('containerImg');
    this.btnContainer = document.getElementById('containerBtn');
    this.counter = document.getElementById('counter');
    this.dogImg = document.getElementById('dogImg');
    this.adminBtn = document.getElementById('admin');
    this.form = document.getElementById('form');
    this.submit = document.getElementById('submit');
    this.dogName = document.getElementById('dogname');
    this.imgSrc = document.getElementById('imgsrc');
    this.clicks = document.getElementById('clicks');

    this.dogImg.addEventListener('click', () => {
      octopus.incrementCounter();
      this.adminRender();
    })
    
    this.renderCounter();
    this.renderBtn();
    this.renderImg();
    this.admin();
    
  },
  
  renderCounter(){ 
    let currentDog = octopus.getCurrentDog();
    this.dogImg.src = currentDog.img;
    this.counter.innerHTML =`Numbers Of Clicks ${currentDog.counter}`;
    
  },
  
  renderBtn(){
    let btn = '';
    for(let dog in this.dogs){
      btn += `
      <button data="${this.dogs[dog].name}">${this.dogs[dog].name}</button>
      `;
    }
    this.btnContainer.insertAdjacentHTML('afterbegin', btn);
    
  },

  changeDogName(btnName, newName){
    let items = this.btnContainer.children;
    console.log(items);
    for(let i = 0, x = items.length; i < x; i++){
      if(items[i].textContent === btnName){
        items[i].innerHTML = `${newName}`;
      }
    }
  },

  renderImg(){  
    this.btnContainer.addEventListener('click', (e) => {
      e.target.setAttribute('data', e.target.textContent)
      this.dogs.filter((item) => {
        if(item.name === e.target.getAttribute('data')){
          console.log(e.target);
          octopus.setCurrentDog(item);
          this.renderCounter();
          this.adminRender();
          this.adminRender2();
        }
      })
    });
    
  },
  
  adminRender(){
    let currentDog = octopus.getCurrentDog(); 
    this.dogName.value = currentDog.name;
    this.imgSrc.value = currentDog.img;
    this.clicks.value = currentDog.counter;

  },

  adminRender2(){ 
    let currentDog = octopus.getCurrentDog();
    currentDog.name = this.dogName.value;
    currentDog.img = this.imgSrc.value;
    currentDog.counter = this.clicks.value;

  },

  admin(){
    this.adminBtn.addEventListener('click', ()=>{
      this.form.style = "display: block";
      this.adminRender();
    });
    this.submit.addEventListener('click', (e) =>{
      let currentDog = octopus.getCurrentDog();
      let name = currentDog.name;
      e.preventDefault();
      switch(e.target.id){
        case 'cancel':
          this.form.style = "display: none";
          break;
        case 'save':
          this.adminRender2();
          this.renderCounter(); 
          this.changeDogName(name, currentDog.name);
          this.form.style = "display: none";
          break;
      }
    });

  }
}

octopus.init();