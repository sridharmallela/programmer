function around(o,t,n){var e=o[t];o[t]=function(){for(var o=new Array(arguments.length),t=0;t<o.length;t++)o[t]=arguments[t];return n.call(this,e,o)}}function before(o,t,n){var e=o[t];o[t]=function(){n.call(this),e.apply(this,arguments)}}function Programmer(){this.commander=com,this.exited=!1}var com=require("commander"),_exit=process.exit;around(com,"optionMissingArgument",function(o,t){return com.outputHelp(),o.apply(this,t),{args:[],unknown:[]}}),before(com,"outputHelp",function(){this._helpShown=!0}),before(com,"unknownOption",function(){this._allowUnknownOption=this._helpShown,this._helpShown||com.outputHelp()}),Programmer.prototype.exit=function(o){function t(){n--||_exit(o)}var n=0,e=[process.stdout,process.stderr];this.exited=!0,e.forEach(function(o){n+=1,o.write("",t)}),t()},exports=module.exports=new Programmer;