import Effect from "@/Effects/Effect";
import {IWithOngoingEffects} from "@/Effects/IWithOngoingEffects";
import {ISkillListenerArgs} from "@/Skills/SkillsListeners";

export default abstract class OverridableEffect<T extends IWithOngoingEffects> extends Effect<T>{
  public override activate(entity: T): void {
    const exist = this.checkExistence(entity);

    if (exist) {
      entity.ongoingEffects = entity.ongoingEffects.filter(e => e.name !== this.name);
      exist.deactivate(entity);
    }

    super.activate(entity);
  }
}
