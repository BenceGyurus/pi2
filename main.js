var started = false;
class calclulating{
    static digit = 0;
    static ms = [0,0];
    static vs = [0,-1];
    static name = "block";
    static window_Size = [window.innerWidth, window.innerHeight];
    static positions = [Math.floor(this.window_Size[0]/3),Math.floor(this.window_Size[0]/3*2)];
    static size = [];
    static y = 0;
    static size_Of_Block = [];
    static interval_Move = "";
    static run = true;
    static split = this.vs[0] >= 0 ? true : false;
    static position_Of_Box = [10, 10]; //x,y
    static pi = 0;
    static c2 = false;
    static position = [];

    static add_Size_To_Blocks(){
        this.size_Of_Block = [];
        let ms = this.ms;
        this.size_Of_Block = [[50,50], [50,50]];
        for (let i = 0; i < 2; i++){
            document.getElementById(`${this.name}${i}`).style.width = `${Math.floor(this.size_Of_Block[i][0])}px`;
            document.getElementById(`${this.name}${i}`).style.height = `${Math.floor(this.size_Of_Block[i][1])}px`;
            this.size_Of_Block.push([100,100]);
            this.y = this.size[1]-this.size_Of_Block[i][1] + 10;
            this.add_Position(`${this.name}${i}`, this.positions[i], this.y);
        }
    }

    static add_Position(id, x,y){
        document.getElementById(id).style.position = "absolute";
        document.getElementById(id).style.top = `${y}px`;
        document.getElementById(id).style.left = `${x}px`;    
    }

    static add_Size_To_Window(){
        this.size = [this.window_Size[0]-50, Math.floor(this.window_Size[1]/2)];
        document.getElementById("body").style = `width: ${this.size[0]}px; height: ${this.size[1]}px`;
    }

    static generate_Blocks(){
        for (let i = 0; i < 2; i++){
            document.getElementById("body").innerHTML += `<div class = "block" id = "${this.name}${i}"></div>`;
        }
        this.ms = [1, 100**this.digit];
    }
    static control_Crashing(){
        if (this.positions[0]+this.size_Of_Block[0][0] - this.positions[1] > 0 && this.split){
            let u1 = this.vs[0];
            let u2 = this.vs[1];
            console.log(u1, u2)
            this.vs[0] = (this.ms[0]-this.ms[1])/(this.ms[0]+this.ms[1])*u1 + (2*this.ms[1])/(this.ms[0] + this.ms[1])*u2; 
            this.vs[1] = (2*this.ms[0])/(this.ms[0] + this.ms[1])*u1 + (this.ms[1]- this.ms[0])/(this.ms[1] + this.ms[0])*u2;
            this.split = false;
            this.pi++;
        }
}
    static control_Wall(){
        if (this.positions[0]-this.position_Of_Box[0] <= 0 && !this.split){
            this.vs[0] = this.vs[0] < 1 ? this.vs[0]*-1 : this.vs[0];
            this.crash = true;
            this.split = true;
            this.pi++;
            //console.log(this.vs);
        }
    }
}

function main(digit){
    c = calclulating;
    c.digit = digit;
    c.positions = [Math.floor(c.window_Size[0]/3),Math.floor(c.window_Size[0]/3*2)];;
    c.add_Size_To_Window();
    c.generate_Blocks();
    c.add_Size_To_Blocks();
    c.vs = [0,-2];
    c.pi = 0;
    c.split = c.vs[0] >= 0 ? true : false;
    console.log(c.size_Of_Block);
    var end_Of_Interval = false;
    interval = setInterval(function() {
        if (c.vs[0] >= 0 && c.vs[1] >= 0 && c.vs[0] < c.vs[1]){
            window.started = false;
            end_Of_Interval = true;
            clearInterval(interval);
        }
        for (let i = 0; i < c.positions.length; i++){
            if (!end_Of_Interval){
            window.started = true;
            }
            c.positions[i] += c.vs[i];
            if (i == 1 && c.positions[1]-c.vs[i] > c.size_Of_Block[0][0]+c.position_Of_Box[0]){
                c.add_Position(`${c.name}${i}`, c.positions[i], c.y);
            }
            else if(i == 0){
                c.add_Position(`${c.name}${i}`, c.positions[i], c.y);
            }
            c.control_Crashing();
            c.control_Wall();
            document.getElementById("pi").innerHTML = `${c.pi}<br /> velocities: ${c.vs[0]}; ${c.vs[1]} <br /> &pi;: ${c.pi/(10**(String(c.pi).length-1))}`;
        }
    },1);
}
    //clearInterval(interval);

function start(){
    if (!window.started){
    digit = document.getElementById("digit").value;
    digit = digit ? digit : 2;
    document.getElementById("body").innerHTML = "";
    main(digit)
    }
}