// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var x, y, confint, conflevel, hypothesis;

function preprocess () {

}

function calculate () {
	// Filter
	echo(getString("filter_embed.code.calculate"));
	// Load variables
	x = getString("x");
	y = getString("y");
	confint = getBoolean("confint_frame.checked");
	conflevel = getString("conflevel");
	hypothesis = getString("hypothesis");
	var options = ', alternative="' + hypothesis + '", paired=TRUE';
	if (confint) {
		options += ", conf.level=" + conflevel;
	}	
	echo('result <- t.test (' + x + ', ' + y + options + ')\n');
}

function printout () {
	echo ('rk.header ("Test T para la media de ' + getString("x.shortname") + ' - ' + getString("y.shortname") + '", ');
	echo ('parameters=list ("Comparaci&oacute;n de" = rk.get.description(' + x + '), "Con" = rk.get.description(' + y + ')' + getString("filter_embed.code.printout") + ', "Hip&oacute;tesis nula" = paste("media ", rk.get.short.name(' + x + '), " = media ", rk.get.short.name(' + y + '))');
	if (hypothesis=="two.sided"){
		echo(', "Hip&oacute;tesis alternativa" = paste("media ", rk.get.short.name(' + x + '), " &ne; media ", rk.get.short.name(' + y + '))');
	}
	else if (hypothesis=="greater") {
		echo(', "Hip&oacute;tesis alternativa" = paste("media ", rk.get.short.name(' + x + '), " &gt; media ", rk.get.short.name(' + y + '))');
	}
    else {
    	echo(', "Hip&oacute;tesis alternativa" = paste("media ", rk.get.short.name(' + x + '), " &lt; media ", rk.get.short.name(' + y + '))');
    }
	if (confint) {
		echo (', "Nivel de confianza del intervalo" = "' + conflevel + '"');
	}
	echo('))\n');
	echo ('rk.results (list(');
	echo ('"Variable" = paste(rk.get.short.name(' + x + '), "-", rk.get.short.name(' + y + ')), ');
	echo ('"Diferencia media estimada" = result$estimate, ');
	echo ('"Grados de libertad" = result$parameter, ');
	echo ('"Estad&iacute;stico t" = result$statistic, ');
	echo ('"p-valor" = result$p.value');
	if (confint) {
		echo (', "Nivel de confianza %" = (100 * attr(result$conf.int, "conf.level"))');
		echo (', "Intervalo de confianza para la media de la diferencia" = result$conf.int');
	}
	echo ('))\n');
}


