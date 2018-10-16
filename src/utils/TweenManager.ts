import TweenCore from './TweenCore';

export default class TweenManager
{
    private static tweens:TweenCore[] = [];
    private static delayPool:Delay[] = [];
    
    public static add(tween:TweenCore)
    {
        if (TweenManager.tweens.indexOf(tween) ==-1)
            TweenManager.tweens.push(tween);
    }
    
    public static remove(tween:TweenCore)
    {
        const index = TweenManager.tweens.indexOf(tween);
        if (index !=-1)
            TweenManager.tweens[index] = null;
    }
    
    public static setMotionSpeed(value:number)
    {
        for (var i = TweenManager.tweens.length; i--;)
            if (TweenManager.tweens[i])
                TweenManager.tweens[i].motionSpeed = value;
    }
    
    public static delayCall(duration:number, complete:Function,
                                             completeArg?:any) {
        const delay = TweenManager.delayPool.pop() || new Delay();
        delay.to(duration, (delay:Delay)=> {
            TweenManager.remove(delay);
            TweenManager.delayPool.push(delay);
            complete(completeArg);
        }, delay);
        TweenManager.add(delay);
        
        return delay;
    }
    
    public static stopDelay(delay:Delay)
    {
        TweenManager.remove(delay);
        if (TweenManager.delayPool.indexOf(delay) ==-1)
            TweenManager.delayPool.push(delay);
    }
    
    public update(delta:number)
    {
        var n = TweenManager.tweens.length,
            c = 0;
        if (n == 0)
            return;
        for (var i = 0; i < n; ++i)
        {
            const tween = TweenManager.tweens[i];
            if (tween)
            {
                if (c != i) {
                    TweenManager.tweens[c] = tween;
                    TweenManager.tweens[i] = null;
                }
                tween.update(delta);
                ++c;
            }
        }
        
        if (c != n)
        {
            const m = TweenManager.tweens.length;
            while (n < m)
                TweenManager.tweens[c++] = TweenManager.tweens[n++];
            
            TweenManager.tweens.length = c;
        }
    }
}

class Delay extends TweenCore
{
    private complete:Function;
    private completeArg:any;
    
    public to(duration:number, complete:Function,
                               completeArg:any) {
        this.duration    = duration;
        this.complete    = complete;
        this.completeArg = completeArg;
        this.time        = 0;
        this.percent     = 0;
    }
    
    public update(delta:number)
    {
        this.tweenCoreUpdate(delta);
        
        if (this.percent >= 1)
        {
            var tComplete = this.complete;
            this.complete = null;
            if (tComplete)
            {
                if (this.completeArg)
                    tComplete(this.completeArg);
                else
                    tComplete();
                tComplete = null;
            }
        }
    }
}
