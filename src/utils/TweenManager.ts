import TweenCore from './TweenCore';
/**
 * @author kozakluke@gmail.com
 */
export default class TweenManager
{
    private static tweens:TweenCore[] = [];
    
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
        
        if (c != i)
        {
            n = TweenManager.tweens.length;
            while (i < n)
                TweenManager.tweens[c++] = TweenManager.tweens[i++];
            
            TweenManager.tweens.length = c;
        }
    }
}
