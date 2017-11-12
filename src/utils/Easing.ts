import MathUtil from './MathUtil';
/**
 * @author kozakluke@gmail.com
 */
export default class Easing
{
    public static linear(t:number, b:number,
                         c:number, d:number) {
        return c*t/d + b;
    }
    
    public static sineIn(t:number, b:number,
                         c:number, d:number) {
        return -c * Math.cos(t/d * MathUtil.PI_D2) + c + b;
    }
    
    public static sineOut(t:number, b:number,
                          c:number, d:number) {
        return c * Math.sin(t/d * MathUtil.PI_D2) + b;
    }
    
    public static sineInOut(t:number, b:number,
                            c:number, d:number) {
        return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
    }
    
    
    public static quintIn(t:number, b:number,
                          c:number, d:number) {
        return c*(t/=d)*t*t*t*t + b;
    }
    
    public static quintOut(t:number, b:number,
                           c:number, d:number) {
        return c*((t=t/d-1)*t*t*t*t + 1) + b;
    }
    
    public static quintInOut(t:number, b:number,
                             c:number, d:number) {
        if ((t/=d/2) < 1)
            return c/2*t*t*t*t*t + b;
        return c/2*((t-=2)*t*t*t*t + 2) + b;
    }
    
    
    public static quartIn(t:number, b:number,
                          c:number, d:number) {
        return c*(t/=d)*t*t*t + b;
    }
    
    public static quartOut(t:number, b:number,
                           c:number, d:number) {
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    }
    
    public static quartInOut(t:number, b:number,
                             c:number, d:number) {
        if ((t/=d/2) < 1)
            return c/2*t*t*t*t + b;
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    }
    
    
    public static quadIn(t:number, b:number,
                         c:number, d:number) {
        return c*(t/=d)*t + b;
    }
    
    public static quadOut(t:number, b:number,
                          c:number, d:number) {
        return -c *(t/=d)*(t-2) + b;
    }
    
    public static quadInOut(t:number, b:number,
                            c:number, d:number) {
        if ((t/=d/2) < 1)
            return c/2*t*t + b;
        return -c/2 * ((--t)*(t-2) - 1) + b;
    }
    
    
    public static expoIn(t:number, b:number,
                         c:number, d:number) {
        return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
    }
    
    public static expoOut(t:number, b:number,
                          c:number, d:number) {
        return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
    }
    
    public static expoInOut(t:number, b:number,
                            c:number, d:number) {
        if (t==0)
            return b;
        if (t==d)
            return b+c;
        if ((t/=d/2) < 1)
            return c/2 * Math.pow(2, 10 * (t - 1)) + b;
        
        return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
    
    
    public static elasticIn(t:number, b:number,
                            c:number, d:number,
                            a:number, p:number) {
        var s:number;
        if (t==0)
            return b;
        if ((t/=d)==1)
            return b+c;  if (!p) p=d*.3;
        if (!a || a < Math.abs(c)) {
            a=c;
            s=p/4;
        }
        else
            s = p/MathUtil.PI_M2 * Math.asin (c/a);
        
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*MathUtil.PI_M2/p )) + b;
    }
    
    public static elasticOut(t:number, b:number,
                             c:number, d:number,
                             a:number, p:number) {
        var s:number;
        if (t==0)
            return b;
        if ((t/=d)==1)
            return b+c;
        if (!p)
            p=d*.3;
        if (!a || a < Math.abs(c)) {
            a=c;
            s=p/4;
        }
        else
            s = p/MathUtil.PI_M2 * Math.asin (c/a);
        
        return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*MathUtil.PI_M2/p ) + c + b);
    }
    
    public static elasticInOut(t:number, b:number,
                               c:number, d:number,
                               a:number, p:number) {
        var s:number;
        if (t==0)
            return b;
        if ((t/=d/2)==2)
            return b+c;
        if (!p)
            p=d*(.3*1.5);
        if (!a || a < Math.abs(c)) {
            a=c;
            s=p/4;
        }
        else
            s = p/MathUtil.PI_M2 * Math.asin (c/a);
        if (t < 1)
            return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*MathUtil.PI_M2/p )) + b;
        
        return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*MathUtil.PI_M2/p )*.5 + c + b;
    }
    
    
    public static circularIn(t:number, b:number,
                             c:number, d:number) {
        return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
    }
    
    public static circularOut(t:number, b:number,
                              c:number, d:number) {
        return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
    }
    
    public static circularInOut(t:number, b:number,
                                c:number, d:number) {
        if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
        return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
    }
    
    
    public static backIn(t:number, b:number,
                         c:number, d:number) {
        var s = 1.70158;
        return c*(t/=d)*t*((s+1)*t - s) + b;
    }
    
    public static backOut(t:number, b:number,
                          c:number, d:number) {
        var s = 1.70158;
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    }
    
    public static backInOut(t:number, b:number,
                            c:number, d:number) {
        var s = 1.70158;
        if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    }
    
    
    public static bounceIn(t:number, b:number,
                           c:number, d:number) {
        return c - Easing.bounceOut (d-t, 0, c, d) + b;
    }
    
    public static bounceOut(t:number, b:number,
                            c:number, d:number) {
        if ((t/=d) < (1/2.75))
            return c*(7.5625*t*t) + b;
        else if (t < (2/2.75))
            return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
        else if (t < (2.5/2.75))
            return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
        else
            return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
    }
    
    public static bounceInOut(t:number, b:number,
                              c:number, d:number) {
        if (t < d/2) return Easing.bounceIn (t*2, 0, c, d) * .5 + b;
        else return Easing.bounceOut (t*2-d, 0, c, d) * .5 + c*.5 + b;
    }
    
    
    public static cubicIn(t:number, b:number,
                          c:number, d:number) {
        return c*(t/=d)*t*t + b;
    }
    
    public static cubicOut(t:number, b:number,
                           c:number, d:number) {
        return c*((t=t/d-1)*t*t + 1) + b;
    }
    
    public static cubicInOut(t:number, b:number,
                             c:number, d:number) {
        if ((t/=d/2) < 1) return c/2*t*t*t + b;
        return c/2*((t-=2)*t*t + 2) + b;
    }
}
