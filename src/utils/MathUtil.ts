/**
 * @author kozakluke@gmail.com
 */
export default class MathUtil
{
    public static readonly PI_M2 = Math.PI * 2;
    public static readonly PI_D2 = Math.PI / 2;
    public static readonly RADIANS = Math.PI / 180;
    public static readonly DEGREES = 180 / Math.PI;
    
    public static rndRange(min:number, max:number)
    {
        return min + (Math.random() * (max - min));
    }
    
    public static rndIntRange(min:number, max:number)
    {
        return Math.round(this.rndRange(min, max));
    }
    
    public static rndSign()
    {
        return Math.random() > 0.5 ? 1 : -1;
    }
    
    public static clamp(value:number, min:number,
                                      max:number)
    {
        return Math.max(min, Math.min(value, max));
    }
    
    public static fabs(x:number)
    {
        return x < 0 ? -x : x;
    }
    
    public static abs(x:number)
    {
        return (x + (x >> 31)) ^ (x >> 31);
    }
    
    public static sign(x:number)
    {
        return Math.abs(x) / x;
    }
}
