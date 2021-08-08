import { 
    create as createJss
}                           from 'jss'
import type * as Jss        from 'jss'
import type { JssStyle }    from 'jss' // ts defs support for jss
// official jss-plugins:
import jssPluginNested      from 'jss-plugin-nested'
import jssPluginCamelCase   from 'jss-plugin-camel-case'
import jssPluginExpand      from 'jss-plugin-expand'
import jssPluginVendor      from 'jss-plugin-vendor-prefixer'
// custom jss-plugins:
import jssPluginGlobal      from '../jss-plugin-global'
import jssPluginExtend      from '../jss-plugin-extend'
import jssPluginShort       from '../jss-plugin-short'



// jss:
const customJss = createJss().setup({plugins:[
    jssPluginGlobal(),    // requires to be placed before all other plugins
    jssPluginExtend(),
    jssPluginNested(),
    jssPluginShort(),     // requires to be placed before `camelCase`
    jssPluginCamelCase(),
    jssPluginExpand(),
    jssPluginVendor(),
]});



export function declareCss(style : JssStyle) {
    customJss
    .createStyleSheet({
        '@global': style
    })
    .attach();
}