#include "HybridShadowRegistry.h"

using namespace margelo::nitro::unistyles;
using namespace facebook::react;

jsi::Value HybridShadowRegistry::link(jsi::Runtime &rt, const jsi::Value &thisValue, const jsi::Value *args, size_t count) {
    ShadowNode::Shared shadowNodeWrapper = shadowNodeFromValue(rt, args[0]);
    core::Unistyle::Shared unistyleWrapper = core::unistyleFromValue(rt, args[1]);
    
    auto& registry = core::UnistylesRegistry::get();
    
    registry.linkShadowNodeWithUnistyle(&shadowNodeWrapper->getFamily(), unistyleWrapper);
    
    return jsi::Value::undefined();
}

jsi::Value HybridShadowRegistry::unlink(jsi::Runtime &rt, const jsi::Value &thisValue, const jsi::Value *args, size_t count) {
    ShadowNode::Shared shadowNodeWrapper = shadowNodeFromValue(rt, args[0]);
    core::Unistyle::Shared unistyleWrapper = core::unistyleFromValue(rt, args[1]);
    
    auto& registry = core::UnistylesRegistry::get();

    registry.unlinkShadowNodeWithUnistyle(&shadowNodeWrapper->getFamily(), unistyleWrapper);
    
    return jsi::Value::undefined();
}
