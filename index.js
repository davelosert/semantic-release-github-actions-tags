async function publish(pluginConfig, context) { 
  await publish(context, pluginConfig);
}

module.expors = {
  publish
};
