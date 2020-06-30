import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator';
import CountUp from 'countup'

@Component({
    name: 'CountTo'
})

export default class CountTo extends Vue {
    @Prop({ type: Number, default: 0 }) public readonly start!: number
    // @Prop(Number) public readonly
    public counter: CountUp = null;
    public get eleId() { // 计算属性的写法
        return `count_to_${(this as any)._uid}`;
    }
    protected render() {
        return (
            <div class='count-up-wrap'>
                <span id={this.eleId}></span>
            </div>
        )
    }
    protected mounted() {
        this.counter = new CountUp(this.eleId, 0, 1000, 0, 1, {}); // 创建CountUp实例，并保存在counter上
        this.counter.start(); // 调用此方法让动画效果开始
    }
}
