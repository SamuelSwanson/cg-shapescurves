class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // num_curve_sections:  int
    constructor(canvas, num_curve_sections, show_points_flag) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d');
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
        this.show_points = show_points_flag;
    }

    // n:  int
    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }

    // flag:  bool
    showPoints(flag) {
        this.show_points = flag;
        this.drawSlide(this.slide_idx);
    }
    
    // slide_idx:  int
    drawSlide(slide_idx) {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0(this.ctx);
                break;
            case 1:
                this.drawSlide1(this.ctx);
                break;
            case 2:
                this.drawSlide2(this.ctx);
                break;
            case 3:
                this.drawSlide3(this.ctx);
                break;
        }
    }

    // ctx:          canvas context
    drawSlide0(ctx) {
        this.drawRectangle(({x:100,y:100}),({x:700,y:300}),[0,0,255,255.0],ctx);
    }

    // ctx:          canvas context
    drawSlide1(ctx) {
        this.drawCircle(({x:200,y:200}),50,[255,0,0,255],ctx);
    }

    // ctx:          canvas context
    drawSlide2(ctx) {
        this.drawBezierCurve(({x:100,y:100}),({x:150,y:200}),({x:300,y:200}),({x:300,y:100}),[0,255,0,255], ctx);
    }

    // ctx:          canvas context
    drawSlide3(ctx) {
        this.drawBezierCurve(({x:250,y:300}),({x:150,y:300}),({x:150,y:200}),({x:200,y:200}),[0,255,0,255], ctx);
        this.drawBezierCurve(({x:200,y:200}),({x:250,y:200}),({x:250,y:100}),({x:150,y:100}),[0,255,0,255], ctx);
        this.drawCircle(({x:300,y:150}),50,[255,0,0,255],ctx);
        this.drawLine(({x:350,y:150}),({x:365,y:100}),[255,0,0,255],ctx);
        if(this.show_points){
            this.drawCirclePoints(({x:350,y:150}),2,[255,0,0,255],ctx);
            this.drawCirclePoints(({x:365,y:100}),2,[255,0,0,255],ctx);
        }
        this.drawBezierCurve(({x:400,y:100}),({x:400,y:225}),({x:475,y:225}),({x:475,y:100}),[0,0,255,255], ctx);
        this.drawBezierCurve(({x:475,y:100}),({x:475,y:225}),({x:550,y:225}),({x:550,y:100}),[0,0,255,255], ctx);
    }
    

    // left_bottom:  object ({x: __, y: __})
    // right_top:    object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawRectangle(left_bottom, right_top, color, ctx) {
        if(this.show_points){
            this.drawPoints(left_bottom, right_top, [0,0,0,255], ctx);
        }
            this.drawLine(({x:left_bottom.x,y:left_bottom.y}), ({x:right_top.x,y:left_bottom.y}),color,ctx);
            this.drawLine(({x:left_bottom.x,y:left_bottom.y}), ({x:left_bottom.x,y:right_top.y}),color,ctx);
            this.drawLine(({x:left_bottom.x,y:right_top.y}), ({x:right_top.x,y:right_top.y}),color,ctx);
            this.drawLine(({x:right_top.x,y:left_bottom.y}), ({x:right_top.x,y:right_top.y}),color,ctx);
    }
    drawPoints(left_bottom, right_top, color, ctx){
        this.drawCirclePoints(left_bottom,2,color,ctx);
        this.drawCirclePoints(right_top,2,color,ctx);
        this.drawCirclePoints({x:left_bottom.x,y:right_top.y},2,color,ctx);
        this.drawCirclePoints({x:right_top.x,y:left_bottom.y},2,color,ctx);
    }

    // center:       object ({x: __, y: __})
    // radius:       int
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawCircle(center, radius, color, ctx) {
        
        let phi = 0;
        let phiAdder = radians(360/this.num_curve_sections);
        let newX = 0;
        let newY = 0;
        let tempX = 0;
        let tempY = 0;
        

        while(phi<=2*Math.PI){
            newX = center.x+radius*Math.cos(phi);
            newY = center.y+radius*Math.sin(phi);
            if(this.show_points){
                this.drawCirclePoints(({x:newX,y:newY}), 2, color, ctx);
            } 
            if(phi>0){
                this.drawLine(({x:tempX,y:tempY}),({x:newX,y:newY}),color,ctx);
            }
            tempX = newX;
            tempY = newY;
            phi = phi+phiAdder;
        }
        this.drawLine(({x:tempX,y:tempY}),({x:center.x+radius*Math.cos(0),y:center.y+radius*Math.sin(0)}),color,ctx);
    }
    drawCirclePoints(center, radius, color, ctx){
        
        let phi = 0;
        let phiAdder = radians(360/4);
        let newX = 0;
        let newY = 0;
        let tempX = 0;
        let tempY = 0;
        

        while(phi<=2*Math.PI){
            newX = center.x+radius*Math.cos(phi);
            newY = center.y+radius*Math.sin(phi);
            if(phi>0){
                this.drawLine(({x:tempX,y:tempY}),({x:newX,y:newY}),color,ctx);
            }
            tempX = newX;
            tempY = newY;
            phi = phi+phiAdder;
        }
        this.drawLine(({x:tempX,y:tempY}),({x:center.x+radius*Math.cos(0),y:center.y+radius*Math.sin(0)}),color,ctx);
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // pt2:          object ({x: __, y: __})
    // pt3:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawBezierCurve(pt0, pt1, pt2, pt3, color, ctx) {
        let x = 0;
        let y = 0;
        let tempX = 0;
        let tempY = 0;
        let t = 1/this.num_curve_sections;
        let tCounter = t;
        if(this.show_points){
            this.drawCirclePoints(({x:pt1.x,y:pt1.y}), 2, color, ctx);
            this.drawCirclePoints(({x:pt2.x,y:pt2.y}), 2, color, ctx);
        }
        for(let i = 0; i < this.num_curve_sections; i++){
            if(i == 0){
                tempX = pt0.x;
                tempY = pt0.y;
            }
            if(this.show_points){
                this.drawCirclePoints(({x:tempX,y:tempY}), 2, color, ctx);
            } 
            x = Math.pow((1-t),3)*pt0.x+3*Math.pow((1-t),2)*t*pt1.x+3*(1-t)*Math.pow(t,2)*pt2.x+Math.pow(t,3)*pt3.x;
            y = Math.pow((1-t),3)*pt0.y+3*Math.pow((1-t),2)*t*pt1.y+3*(1-t)*Math.pow(t,2)*pt2.y+Math.pow(t,3)*pt3.y;
            this.drawLine(({x:tempX,y:tempY}),({x:x,y:y}),color,ctx);
            t = t + tCounter;
            tempX = x;
            tempY = y;
        }
        if(this.show_points){
            this.drawCirclePoints(({x:tempX,y:tempY}), 2, color, ctx);
        }
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawLine(pt0, pt1, color, ctx)
    {
        ctx.strokeStyle = 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + (color[3]/255.0) + ')';
        ctx.beginPath();
        ctx.moveTo(pt0.x, pt0.y);
        ctx.lineTo(pt1.x, pt1.y); // another test
        ctx.stroke(); // comment for ssh
    }

};
