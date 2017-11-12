import DNumber from '../utils/DNumber';
import TweenCore from '../utils/TweenCore';
/**
 * @author kozakluke@gmail.com
 */
export default class TweenScale extends TweenCore
{
    private scaleX:DNumber = new DNumber();
    private scaleY:DNumber = new DNumber();
    private delay:number;
    private ease:Function;
    private complete:Function;
    private completeArg:any;
    
    constructor(private target:any) { super(); }
    
    public to(duration:number, delay:number, ease:Function,
                                             complete:Function,
                                             completeArg:any,
                                             scaleX:number,
                                             scaleY:number) {
        this.duration    = duration;
        this.delay       = delay;
        this.ease        = ease;
        this.complete    = complete;
        this.completeArg = completeArg;
        this.time        = 0;
        this.percent     = 0;
        
        this.scaleX.set(this.target.scale.x, scaleX);
        this.scaleY.set(this.target.scale.y, scaleY);
    }
    
    update(delta:number)
    {
        if (this.delay)
        {
            this.time += delta * this.motionSpeed;
            if (this.time < this.delay)
                return;
            this.time  = 0;
            this.delay = null;
        }
        this.tweenCoreUpdate(delta);
        
        const ease = this.ease(this.time, 0, 1, this.duration);
        this.target.scale.x = this.scaleX.begin - (this.scaleX.begin - this.scaleX.end) * ease;
        this.target.scale.y = this.scaleY.begin - (this.scaleY.begin - this.scaleY.end) * ease;
        
        if (this.percent >= 1)
        {
            var complete = this.complete;
            this.complete = null;
            if (complete)
            {
                if (this.completeArg)
                    complete(this.completeArg);
                else
                    complete();
                complete = null;
            }
        }
    }
}
