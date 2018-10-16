import DNumber from '../utils/DNumber';
import TweenCore from '../utils/TweenCore';

export default class TweenAlpha extends TweenCore
{
    private alpha:DNumber = new DNumber();
    private delay:number;
    private complete:Function;
    private completeArg:any;
    
    constructor(private target:any) { super(); }
    
    public to(duration:number, delay:number, complete:Function,
                                             completeArg:any,
                                             alpha:number) {
        this.duration    = duration;
        this.delay       = delay;
        this.complete    = complete;
        this.completeArg = completeArg;
        this.time        = 0;
        this.percent     = 0;
        
        this.alpha.set(this.target.alpha, alpha);
    }
    
    public update(delta:number)
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
        
        this.target.alpha = this.alpha.begin - (this.alpha.begin - this.alpha.end) * this.percent;
        
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
