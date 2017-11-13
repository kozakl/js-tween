import TweenAlpha from './tweens/TweenAlpha';
import TweenPos from './tweens/TweenPos';
import TweenScale from './tweens/TweenScale';
import Easing from './utils/Easing';
import TweenManager from './utils/TweenManager';
import {Application, Graphics} from 'pixi.js';
/**
 * @author kozakluke@gmail.com
 */
class Main
{
    private static animationId:number;
    private static last  = 0;
    private static delta = 0;
    
    private app:Application;
    private updateHandler:Function;
    
    constructor()
    {
        window.onload = this.onLoad.bind(this);
    }
    
    private onLoad()
    {
        const app = this.app = new Application({
            backgroundColor: 0x333333,
            autoResize: false
        });
        document.body.appendChild(app.view);
        
        const tweenManager = new TweenManager();
        
        const shape = new Graphics();
        app.stage.addChild(shape);
        shape.beginFill(0xFFFF00, 1);
        shape.drawRect(0, 0, 20, 20);
        shape.endFill();
        shape.position.x = 100;
        shape.position.y = 100;
        
        const tweenAlpha = new TweenAlpha(shape);
        tweenAlpha.to(5, 1,
            TweenManager.remove, tweenAlpha, 0.5);
        TweenManager.add(tweenAlpha);
        
        const tweenPos = new TweenPos(shape);
        tweenPos.to(5, null, Easing.backInOut,
            TweenManager.remove, tweenPos, window.innerWidth - 100, 100);
        TweenManager.add(tweenPos);
        
        TweenManager.delayCall(1, ()=> {
            const tweenScale = new TweenScale(shape);
            tweenScale.to(3.5, null, Easing.sineIn,
                TweenManager.remove, tweenScale, 1.75, 1.75);
            TweenManager.add(tweenScale);
        });
        
        
        TweenManager.delayCall(3, (message:string)=> {
            console.log(message);
        }, 'Delay Call!');
        
        document.addEventListener('visibilitychange', this.onVisibility.bind(this));
        window.addEventListener('resize', this.onResize.bind(this));
        setTimeout(this.onResize.bind(this), 0);
        
        var delta = 0;
        (this.updateHandler = function update(now:number)
        {
            Main.animationId = requestAnimationFrame(update);
            delta      = now - Main.last;
            Main.last  = now;
            Main.delta = delta * 0.06;
            
            tweenManager.update(delta * 0.001);
            app.render();
        })(performance.now());
    }
    
    private onVisibility()
    {
        if (document['visibilityState'] == 'hidden')
            cancelAnimationFrame(Main.animationId);
        else if (document['visibilityState'] == 'visible')
            this.updateHandler(Main.last = performance.now());
    }
    
    private onResize()
    {
        this.app.view.style.width  = window.innerWidth  + 'px';
        this.app.view.style.height = window.innerHeight + 'px';
        this.app.renderer.resize(window.innerWidth  * window.devicePixelRatio || 1,
                                 window.innerHeight * window.devicePixelRatio || 1);
        this.app.render();
    }
}

new Main();
