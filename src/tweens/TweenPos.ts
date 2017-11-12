import DNumber from '../utils/DNumber';
import TweenCore from '../utils/TweenCore';
/**
 * @author kozakluke@gmail.com
 */
export default class TweenPos extends TweenCore
{
    private x:DNumber = new DNumber();
    private y:DNumber = new DNumber();
    private delay:number;
    private ease:Function;
    private complete:Function;
    private completeArg:any;
    
    constructor(private target:any) { super(); }
    
    public to(duration:number, delay:number, ease:Function,
                                             complete:Function,
                                             completeArg:any,
                                             x:number, y:number) {
        this.duration    = duration;
        this.delay       = delay;
        this.ease        = ease;
        this.complete    = complete;
        this.completeArg = completeArg;
        this.time        = 0;
        this.percent     = 0;
        
        this.x.set(this.target.position.x, x);
        this.y.set(this.target.position.y, y);
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
        
        const ease = this.ease(this.time, 0, 1, this.duration);
        this.target.position.x = this.x.begin - (this.x.begin - this.x.end) * ease;
        this.target.position.y = this.y.begin - (this.y.begin - this.y.end) * ease;
        
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
