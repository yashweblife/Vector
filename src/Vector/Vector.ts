export class Vector {
    public x: number = 0;
    public y: number = 0;
    public z: number = 0;
    public mag: number = 0;
    constructor(x: number = 0, y: number = 0, z: number = 0) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.recalib();
    }
    private recalib = () => {
      this.mag = Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
    };
    public add = (vec: Vector) => {
      this.x += vec.x;
      this.y += vec.y;
      this.z += vec.z;
      this.recalib();
    };
    public sub = (vec: Vector) => {
      this.x += vec.x;
      this.y += vec.y;
      this.z += vec.z;
      this.recalib();
    };
    public scalar = (val: number) => {
      this.x *= val;
      this.y *= val;
      this.z *= val;
      this.recalib();
    };
    public rotate = (vec: Vector) => {
      this.rotateX(vec.x);
      this.rotateY(vec.y);
      this.rotateZ(vec.z);
      this.recalib();
    };
    public rotateX = (val: number) => {
      const rad = val * (Math.PI / 180);
      this.y = this.y * Math.cos(rad) - this.z * Math.sin(rad);
      this.z = this.y * Math.sin(rad) + this.z * Math.cos(rad);
      this.recalib();
    };
    public rotateY = (val: number) => {
      const rad = val * (Math.PI / 180);
      this.x = this.x * Math.cos(rad) + this.z * Math.sin(rad);
      this.z = -this.x * Math.sin(rad) + this.z * Math.cos(rad);
      this.recalib();
    };
    public rotateZ = (val: number) => {
      const rad = val * (Math.PI / 180);
      this.x = this.x * Math.cos(rad) - this.y * Math.sin(rad);
      this.y = this.x * Math.sin(rad) + this.y * Math.cos(rad);
      this.recalib();
    };
    public normalize = () => {
      this.x = this.x / this.mag;
      this.y = this.y / this.mag;
      this.z = this.z / this.mag;
      this.recalib();
    };
    public setMag = (val: number) => {
      this.normalize();
      this.scalar(val);
      this.recalib();
    };
    public distance = (vec: Vector): number => {
      return Math.sqrt(
        (this.x - vec.x) ** 2 + (this.y - vec.y) ** 2 + (this.z - vec.z) ** 2
      );
    };
    public dot = (vec: Vector): number => {
      return this.x * vec.x + this.y * vec.y + this.z * vec.z;
    };
    public corss = (vec: Vector): Vector => {
      const x = this.y * vec.z - this.z * vec.y;
      const y = this.z * vec.x - this.x * vec.z;
      const z = this.x * vec.y - this.y * vec.x;
      return new Vector(x, y, z);
    };
    public toMatrix = (): number[] => {
      return [this.x, this.y, this.z];
    };
    public clone = (): Vector => {
      return new Vector(this.x, this.y, this.z);
    };
    public negate = () => {
      this.scalar(-1);
    };
    public static VecFromAdd = (vec1: Vector, vec2: Vector): Vector => {
      return new Vector(vec1.x + vec2.x, vec1.y + vec2.y);
    };
    public static VecFromSub = (vec1: Vector, vec2: Vector): Vector => {
      return new Vector(vec1.x - vec2.x, vec1.y - vec2.y);
    };
    public static getRand = (mag: number): Vector => {
      return new Vector(
        Math.random() * mag,
        Math.random() * mag,
        Math.random() * mag
      );
    };
    public static getRandSigned = (mag: number): Vector => {
      return new Vector(
        (Math.random() - 0.5) * 2 * mag,
        (Math.random() - 0.5) * 2 * mag,
        (Math.random() - 0.5) * 2 * mag
      );
    };
    public static getRandArray = (size: number, mag: number): Vector[] => {
      const output: Vector[] = [];
      for (let i = 0; i < size; i++) {
        output.push(Vector.getRand(mag));
      }
      return output;
    };
    public static getRandSignedArray = (size: number, mag: number): Vector[] => {
      const output: Vector[] = [];
      for (let i = 0; i < size; i++) {
        output.push(Vector.getRandSigned(mag));
      }
      return output;
    };
  }