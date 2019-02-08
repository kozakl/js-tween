export default class TweenCore
{
    public motionSpeed:number = 1;
    public tweenCoreUpdate:Function;
    
    protected duration:number;
    protected time:number;
    protected percent:number;
    
    public update(delta:number)
    {
        this.time   += delta * this.motionSpeed;
        this.percent = this.time / this.duration;
        if (this.percent > 1) {
            this.percent = 1;
            this.time    = this.duration;
        }
    }
}

TweenCore.prototype.tweenCoreUpdate = TweenCore.prototype.update;
