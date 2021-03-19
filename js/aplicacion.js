"use strict";

var diccionario = {
  filters: {
    target_social_need: {
      options: [
        {
          value: "Childcare",
        },
        {
          label0: "Early childhood development",
          value: "Early childhood education and development",
        },
        {
          value: "Education",
        },
        {
          value: "Employment",
        },
        {
          value: "Financial strain",
        },
        {
          value: "Food insecurity",
        },
        {
          value: "Healthcare services",
        },
        {
          value: "Housing instability/quality",
        },
        {
          value: "Interpersonal violence",
        },
        {
          value: "Legal services",
        },
        {
          value: "Social isolation",
        },
        {
          value: "Transportation help",
        },
        {
          value: "Utilities help",
        },
        {
          value: "Multiple domains addressed",
        },
      ],
    },
    target_population: {
      options: [
        {
          value: "Frequent users of healthcare services",
        },
        {
          value: "Homeless persons",
        },
        {
          value: "Medicare/Medicaid enrollees (or eligible)",
        },
        {
          value: "Persons living in low-income neighborhood",
        },
        {
          value: "Persons meeting specific medical criteria",
        },
        {
          value: "Persons with low income",
        },
        {
          value: "Pregnant persons",
        },
        {
          value: "Veterans",
        },
      ],
    },
    study_design: {
      options: [
        {
          value: "Case-control",
        },
        {
          value: "Cohort study",
        },
        {
          value: "Comparative effectiveness within arm pre-post outcome trend",
        },
        {
          value: "Pre-post",
        },
        {
          label0: "Randomized controlled trial",
          value: "RCT",
        },
        {
          value: "Other observational",
        },
      ],
    },
  },
  columns: {
    age_group: {
      menu: "Age group",
      options: [
        {
          value: "Children (&lt;18 years) or children and their families",
        },
        {
          value: "Adolescents/young adults (e.g., 13-20 years)",
        },
        {
          value: "Adults (&ge;18 years)",
        },
        {
          value: "Older adults (e.g., &ge;50 years)",
        },
      ],
    },
    race_ethnicity_majority: {
      menu: "Majority ethnic/racial group",
      label: "Majority ethnic group",
      options: [
        {
          value: "Majority Asian/Pacific Islander",
          label: "Asian/Pacific Islander",
        },
        {
          value: "Majority Black/Non-Hispanic Black",
          label: "Non-Hispanic Black",
        },
        {
          value: "Majority Hispanic/Latino",
          label: "Hispanic",
        },
        {
          value: "Majority Native American/American Indian/Indigenous",
          label: "Native American/American Indian/Indigenous",
        },
        {
          value: "Majority White/Non-Hispanic White",
          label: "Non-Hispanic White",
        },
        {
          value: "No single group is a majority",
        },
        {
          value: "Not Reported",
        },
        {
          value: "Other",
        },
      ],
    },
    proportion_immigrant: {
      menu: "Percentage of immigrants",
      options: [
        {
          range: [0, 100],
          value: "Immigrant participation",
        },
      ],
    },
    proportion_male: {
      menu: "Sex (percentage male)",
      options: [
        {
          range: [0, 24],
          value: "0 – 24%",
        },
        {
          range: [25, 49],
          value: "25 – 49%",
        },
        {
          range: [50, 74],
          value: "50 – 74%",
        },
        {
          range: [75, 100],
          value: "75 – 100%",
        },
      ],
    },
  },
  rows: {
    addresses_behavioral_outcomes: {
      options: [
        {
          value: "Yes",
        },
        {
          value: "No",
        },
      ],
    },
    behavioral_outcomes: {
      menu: "Behavioral",
      label: "Behavioral outcomes",
      options: [
        {
          value: "Changes in substance use",
          key: "result_substance_use",
        },
        {
          value: "Changes in dietary intake",
          key: "result_diet",
        },
        {
          value: "Changes in physical activity",
          key: "result_physical_activity",
        },
        {
          value: "Other",
          key: "result_other_behavior ",
        },
      ],
    },
    addresses_health_outcomes: {
      options: [
        {
          value: "Yes",
        },
        {
          value: "No",
        },
      ],
    },
    health_outcomes: {
      menu: "Health",
      label: "Health outcomes",
      options: [
        {
          value: "Changes in functional outcomes (e.g., blood pressure)",
          label: "Changes in functional outcomes",
          key: "result_functional",
        },
        {
          value: "Changes in self-reported health",
          key: "result_self_health",
        },
        {
          value: "Child development outcomes",
          label: "Child emotional, mental, or physical growth outcomes",
          key: "result_child_development",
        },
        {
          value: "Low birth weight",
          key: "result_low_birth_weight",
        },
        {
          value: "Mental health status",
          key: "result_mental_health_status",
        },
        {
          value: "Mortality",
          key: "result_mortality",
        },
        {
          value: "Quality of life",
          key: "result_quality_of_life",
        },
        {
          value: "Quality-adjusted life-years",
          key: "result_QALY",
        },
        {
          value: "Reduction in morbidity",
          key: "result_morbidity",
        },
        {
          value: "Other",
          key: "result_other_health",
        },
      ],
    },
    addresses_healthcareuse_outcomes: {
      options: [
        {
          value: "Yes",
        },
        {
          value: "No",
        },
      ],
    },
    healthcareuse_outcomes: {
      menu: "Use of healthcare services",
      options: [
        {
          value: "Adherence to treatment (medications/follow-up visit)",
          key: "result_adherence",
        },
        {
          value: "Clinic attendance rate",
          key: "result_clinic_attendance",
        },
        {
          value: "Emergency department visits/urgent care",
          key: "result_emergency_visits",
        },
        {
          value: "Frequency of healthcare use",
          key: "result_frequency_healthcare_use",
        },
        {
          value: "Hospital days",
          key: "result_hospital_days",
        },
        {
          value: "Hospital readmissions",
          key: "result_hospital_readmission",
        },
        {
          value: "Immunizations",
          key: "result_immunizations",
        },
        {
          value: "Inpatient admissions",
          key: "result_inpatient_admission",
        },
        {
          value: "Medical home",
          key: "result_medical_home",
        },
        {
          value: "Missed appointments",
          key: "result_missed_appt",
        },
        {
          value: "Outpatient visits",
          key: "result_outpatient_visits",
        },
        {
          value: "Post hospital primary care visit",
          key: "result_post_primarycare_visits",
        },
        {
          value: "Prenatal care",
          key: "result_prenatal",
        },
        {
          value: "Preventive care utilization (well child visits)",
          key: "result_preventive",
        },
        {
          value: "Sobering center use",
          key: "result_sober_center",
        },
        {
          value: "Use of emergency transportation",
          key: "result_emergency_transport",
        },
        {
          value: "Other",
          key: "result_other_healthcareuse",
        },
      ],
    },
  },
  outcomes: {
    options: [
      {
        value: "Positive",
      },
      {
        value: "Negative",
      },
      {
        value: "Mixed results",
        label: "Mixed",
      },
      {
        value: "Multiple arms",
      },
      {
        value: "No significant difference",
      },
    ],
  },
  switch: {
    quality: {
      menu: "Study quality",
      //options: [{ value: "Study quality" }],
    },
  },
};

var Puntos = function (el, i) {
  var debug = false;
  var caja = new Box({
    content: { width: 1000, height: 600 },
    padding: 10,
  });

  var ms = 400;

  var contenedor = null;
  var svg = null;
  var raiz = null;

  var gWrapperSuperior = null;
  var gOutcome = null;
  var gStudy = null;
  var gExplicacion = null;
  var gTituloFilas = null;
  var gEncabezadoColumnas = null;

  var gPrincipal = null;
  var gEncabezadoFilas = null;
  var gCeldas = null;
  var gPuntos = null;
  var gBotones = null;
  var gSeparadores = null;

  var cajaWrapperSuperior = new Box();
  var cajaOutcome = new Box();
  var cajaStudy = new Box();
  var cajaExplicacion = new Box();
  var cajaTituloFilas = new Box();
  var cajaEncabezadoColumnas = new Box();

  var cajaPrincipal = new Box();
  var cajaEncabezadoFilas = new Box();
  var cajaPuntos = new Box();
  var cajaBotones = new Box({ content: { width: 25, height: 25 }, margin: 5 });
  var cajaSeparadores = new Box();

  var paddingEncabezadoH = 10;
  var paddingEncabezadoV = 5;
  var anchoColumna = 0;
  var anchoColumnaTexto = 0;

  var puntos = null;
  var memoriaPuntos = {};
  var opcionesMenu = [];

  var controles = { filters: null, rows: null, columns: null, switch: null };

  var maxPuntosPorFila = 20;

  var filas = 0;
  var columnas = 0;

  function setup() {
    contenedor = d3.select(el[0]);
    var flag = el.data("visualizacion") || false;
    if (flag === false) {
      el.data("visualizacion", true);
      contenedor.selectAll("svg").remove();
      svg = contenedor
        .append("svg")
        .attr("preserveAspectRatio", "xMidYMid")
        .attr("viewBox", [0, 0, caja.outer.width, caja.outer.height]);

      el.attr("data-setup", true);

      if (debug === true) {
        svg
          .attr("id", el.data("tipo-visualizacion") + "-" + i)
          .append("rect")
          .attr("fill", "yellow")
          .attr("opacity", 0.5)
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", caja.outer.width)
          .attr("height", caja.outer.height);
      }

      var defs = svg.append("defs");
      var degradado = defs
        .append("linearGradient")
        .attr("id", "degradado")
        .attr("x1", "0")
        .attr("y1", "0")
        .attr("x2", "0")
        .attr("y2", "1")
        .attr("gradientUnits", "objectBoundingBox");
      degradado
        .append("stop")
        .attr("offset", "0")
        .attr("stop-color", "#1c3a8d");
      degradado
        .append("stop")
        .attr("offset", "0.7")
        .attr("stop-color", "#f16b75");

      var mitades = defs
        .append("linearGradient")
        .attr("id", "mitades")
        .attr("x1", "0")
        .attr("y1", "0")
        .attr("x2", "1")
        .attr("y2", "0")
        .attr("gradientUnits", "objectBoundingBox");
      mitades
        .append("stop")
        .attr("offset", "0.5")
        .attr("stop-color", "#1c3a8d");
      mitades
        .append("stop")
        .attr("offset", "0.5")
        .attr("stop-color", "#f16b75");

      raiz = svg;
      svg = svg
        .append("g")
        .attr(
          "transform",
          "translate(" + caja.padding.left + "," + caja.padding.top + ")"
        );

      if (debug === true) {
        svg
          .attr("class", "svg")
          .append("rect")
          .attr("width", caja.content.width)
          .attr("height", caja.content.height)
          .attr("fill", "blue")
          .attr("opacity", 0.5);
      }

      gWrapperSuperior = svg.append("g");
      if (debug === true) {
        gWrapperSuperior
          .append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", 0)
          .attr("width", 0)
          .attr("fill", "yellow")
          .attr("opacity", 0.5);
      }

      gStudy = gWrapperSuperior.append("g");
      gOutcome = gWrapperSuperior.append("g");
      gExplicacion = gWrapperSuperior.append("g");
      gTituloFilas = gWrapperSuperior.append("g");
      gEncabezadoColumnas = gWrapperSuperior.append("g");
      gPrincipal = svg.append("g");
      if (debug === true) {
        gPrincipal
          .append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", 0)
          .attr("width", 0)
          .attr("fill", "blue")
          .attr("opacity", 0.3);
      }

      gEncabezadoFilas = gPrincipal.append("g");
      gCeldas = gPrincipal.append("g");
      gPuntos = gPrincipal.append("g");
      gBotones = gPrincipal.append("g");
      gSeparadores = gPrincipal.append("g");

      if (debug === true) {
        gWrapperSuperior.attr("id", "gWrapperSuperior-" + i);
        gStudy
          .attr("id", "gStudy-" + i)
          .append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", 0)
          .attr("width", 0)
          .attr("fill", "red")
          .attr("opacity", 0.3);
        gOutcome
          .attr("id", "gOutcome-" + i)
          .append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", 0)
          .attr("width", 0)
          .attr("fill", "green")
          .attr("opacity", 0.3);
        gExplicacion
          .attr("id", "gExplicacion-" + i)
          .append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", 0)
          .attr("width", 0)
          .attr("fill", "blue")
          .attr("opacity", 0.3);
        gTituloFilas
          .attr("id", "gTituloFilas-" + i)
          .append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", 0)
          .attr("width", 0)
          .attr("fill", "red")
          .attr("opacity", 0.3);
        gEncabezadoColumnas
          .attr("id", "gEncabezadoColumnas-" + i)
          .append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", 0)
          .attr("width", 0)
          .attr("fill", "green")
          .attr("opacity", 0.3);
        gPrincipal.attr("id", "gPrincipal-" + i);
        gEncabezadoFilas
          .attr("id", "gEncabezadoFilas-" + i)
          .append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", 0)
          .attr("width", 0)
          .attr("fill", "red")
          .attr("opacity", 0.3);
        gCeldas.attr("id", "gCeldas-" + i);
        gPuntos
          .attr("id", "gPuntos-" + i)
          .append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", 0)
          .attr("width", 0)
          .attr("fill", "green")
          .attr("opacity", 0.3);
        gBotones.attr("id", "gBotones-" + i);
        gSeparadores
          .attr("id", "gSeparadores-" + i)
          .append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", 0)
          .attr("width", 0)
          .attr("fill", "blue")
          .attr("opacity", 0.3);
      }

      var articulosURL = "csv/" + el.data("articulos") + ".csv";

      //volver
      completaDiccionario(diccionario.filters);
      completaDiccionario(diccionario.columns);
      completaDiccionario(diccionario.rows);
      completaOpciones(diccionario.outcomes);

      var promesas = [];

      promesas.push(
        d3.csv(articulosURL, function (d, i) {
          return {
            id: d.Refid + ":" + i,
            indice: i,
            subindice: 0,
            multiples: false,
            ref_id: +d.Refid,
            study_name: limpiaCadena(d.study_name),
            title: limpiaCadena(d.Title),
            age_group: convierteCadenaAArreglo(d.age_group),
            addresses_behavioral_outcomes: convierteCadenaABooleano(
              d.addresses_behavioral_outcomes
            ),
            behavioral_outcomes: convierteCadenaAArreglo(
              d.behavioral_outcomes,
              true
            ),
            result_diet: convierteCadenaAResultados(
              d.result_diet,
              diccionario.outcomes
            ),
            result_substance_use: convierteCadenaAResultados(
              d.result_substance_use,
              diccionario.outcomes
            ),
            result_physical_activity: convierteCadenaAResultados(
              d.result_physical_activity,
              diccionario.outcomes
            ),
            result_other_behavior: convierteCadenaAResultados(
              d.result_other_behavior,
              diccionario.outcomes
            ),
            addresses_health_outcomes: convierteCadenaABooleano(
              d.addresses_health_outcomes
            ),
            health_outcomes: convierteCadenaAArreglo(d.health_outcomes, true),
            result_functional: convierteCadenaAResultados(
              d.result_functional,
              diccionario.outcomes
            ),
            result_self_health: convierteCadenaAResultados(
              d.result_self_health,
              diccionario.outcomes
            ),
            result_child_development: convierteCadenaAResultados(
              d.result_child_development,
              diccionario.outcomes
            ),
            result_low_birth_weight: convierteCadenaAResultados(
              d.result_low_birth_weight,
              diccionario.outcomes
            ),
            result_mental_health_status: convierteCadenaAResultados(
              d.result_mental_health_status,
              diccionario.outcomes
            ),
            result_mortality: convierteCadenaAResultados(
              d.result_mortality,
              diccionario.outcomes
            ),
            result_other_health: convierteCadenaAResultados(
              d.result_other_health,
              diccionario.outcomes
            ),
            result_quality_of_life: convierteCadenaAResultados(
              d.result_quality_of_life,
              diccionario.outcomes
            ),
            result_QALY: convierteCadenaAResultados(
              d.result_QALY,
              diccionario.outcomes
            ),
            result_morbidity: convierteCadenaAResultados(
              d.result_morbidity,
              diccionario.outcomes
            ),
            addresses_healthcareuse_outcomes: convierteCadenaABooleano(
              d.addresses_healthcareuse_outcomes
            ),
            healthcareuse_outcomes: convierteCadenaAArreglo(
              d.healthcareuse_outcomes,
              true
            ),
            result_adherence: convierteCadenaAResultados(
              d.result_adherence,
              diccionario.outcomes
            ),
            result_clinic_attendance: convierteCadenaAResultados(
              d.result_clinic_attendance,
              diccionario.outcomes
            ),
            result_emergency_visits: convierteCadenaAResultados(
              d.result_emergency_visits,
              diccionario.outcomes
            ),
            result_frequency_healthcare_use: convierteCadenaAResultados(
              d.result_frequency_healthcare_use,
              diccionario.outcomes
            ),
            result_hospital_days: convierteCadenaAResultados(
              d.result_hospital_days,
              diccionario.outcomes
            ),
            result_hospital_readmission: convierteCadenaAResultados(
              d.result_hospital_readmission,
              diccionario.outcomes
            ),
            result_immunizations: convierteCadenaAResultados(
              d.result_immunizations,
              diccionario.outcomes
            ),
            result_inpatient_admission: convierteCadenaAResultados(
              d.result_inpatient_admission,
              diccionario.outcomes
            ),
            result_medical_home: convierteCadenaAResultados(
              d.result_medical_home,
              diccionario.outcomes
            ),
            result_missed_appointmentst: convierteCadenaAResultados(
              d.result_missed_appointmentst,
              diccionario.outcomes
            ),
            result_other_healthcareuse: convierteCadenaAResultados(
              d.result_other_healthcareuse,
              diccionario.outcomes
            ),
            result_outpatient_visits: convierteCadenaAResultados(
              d.result_outpatient_visits,
              diccionario.outcomes
            ),
            result_post_primarycare_visits: convierteCadenaAResultados(
              d.result_post_primarycare_visits,
              diccionario.outcomes
            ),
            result_prenatal: convierteCadenaAResultados(
              d.result_prenatal,
              diccionario.outcomes
            ),
            result_preventive: convierteCadenaAResultados(
              d.result_preventive,
              diccionario.outcomes
            ),
            result_sober_center: convierteCadenaAResultados(
              d.result_sober_center,
              diccionario.outcomes
            ),
            result_emergency_transport: convierteCadenaAResultados(
              d.result_emergency_transport,
              diccionario.outcomes
            ),
            proportion_immigrant: convierteCadenaARangos(
              d.proportion_immigrant,
              diccionario.columns.proportion_immigrant
            ),
            proportion_male: convierteCadenaARangos(
              d.proportion_male,
              diccionario.columns.proportion_male
            ),
            race_ethnicity_majority: limpiaCadena(d.race_ethnicity_majority),
            risk_of_bias: limpiaCadena(d.risk_of_bias),
            study_design: limpiaCadena(d.study_design),
            target_population: convierteCadenaAArreglo(d.target_population),
            target_social_need: convierteCadenaAArreglo(d.target_social_need),
            quality: limpiaCadena(d.quality),
          };
        })
      );

      Promise.all(promesas).then(function (values) {
        puntos = values[0];
        //console.clear();
        /*
        completaDiccionario(diccionario.filters);
        completaDiccionario(diccionario.columns);
        completaDiccionario(diccionario.rows);
        completaOpciones(diccionario.outcomes);
        */
        opcionesMenu = setOpcionesMenu(diccionario);
        puntos = _.orderBy(puntos, ["id"], ["asc"]);
        reset();
        main();
      });
    }
  }

  function completaDiccionario(obj) {
    _.each(obj, function (valor) {
      completaOpciones(valor);
    });
  }

  function completaOpciones(obj) {
    if (obj.hasOwnProperty("menu")) {
      obj.menu = he.decode(obj.menu);
      if (obj.hasOwnProperty("label")) {
        obj.label = he.decode(obj.label);
      }
      obj.label = obj.label || obj.menu;
      obj.label = obj.label.replace(/\/+/g, ", ");
    }
    _.each(obj.options, function (opcion) {
      opcion.value = he.decode(opcion.value);
      if (opcion.hasOwnProperty("label")) {
        opcion.label = he.decode(opcion.label);
      }
      opcion.label = opcion.label || opcion.value;
      opcion.label = opcion.label.replace(/\/+/g, ", ");
    });
  }

  function setOpcionesMenu(diccionario) {
    var opciones = [];
    _.each(diccionario, function (obj, tipo) {
      _.each(obj, function (o, clave) {
        var m = o.menu || null;
        if (m !== null) {
          opciones.push({
            tipo: tipo,
            clave: clave,
            menu: m,
            opcion: false,
          });
        } else {
          var subopciones = o.options || null;
          if (subopciones !== null) {
            _.each(subopciones, function (subopcion) {
              opciones.push({
                tipo: tipo,
                clave: clave,
                menu: subopcion.label,
                opcion: true,
              });
            });
          }
        }
      });
    });
    return opciones;
  }

  //TODO: Checar que los ids sean únicos y  mantengan referencia con los originales lo más posible
  function desagregaPuntos(puntos) {
    //puntos = _.filter(puntos, { ref_id: 1110 });
    //puntos = _.filter(puntos, { ref_id: 712 });
    //puntos = _.filter(puntos, { ref_id: 7434 });
    /*
    puntos = _.filter(puntos, function (p) {
      return p.ref_id == 1110 || p.ref_id == 712 || p.ref_id == 7434;
    });
*/
    //return puntos;
    var arreglo = [];
    var claves = [];
    if (controles.rows !== null) {
      claves.push(controles.rows.clave);
    }
    if (controles.columns !== null) {
      claves.push(controles.columns.clave);
    }
    _.each(claves, function (clave) {
      _.each(puntos, function (punto) {
        punto.multiples = false;
        var valores = punto[clave];
        if (Array.isArray(valores) && valores.length > 1) {
          punto.multiples = true;
          _.each(valores, function (valor) {
            var aux = _.cloneDeep(punto);
            /*
            clonsola.log("Clonación");
            clonsola.log(aux);
            clonsola.log(punto);
            */
            aux[clave] = [valor];
            arreglo.push(aux);
          });
        } else {
          var aux = _.cloneDeep(punto);
          arreglo.push(aux);
        }
      });
      puntos = arreglo;
      arreglo = [];
    });
    var subindices = {};
    _.each(puntos, function (p) {
      if (!subindices.hasOwnProperty(p.id)) {
        subindices[p.id] = 0;
      }
      p.subindice = subindices[p.id];
      subindices[p.id] = subindices[p.id] + 1;
      if (p.subindice !== 0) {
        p.id = `${p.ref_id}:${p.indice}:${p.subindice}`;
      }
    });
    /*
    clonsola.log("subindices");
    clonsola.log(subindices);
    clonsola.log("puntos");
    clonsola.log(puntos);
    */
    return puntos;
  }

  function main() {
    el.removeClass("espera");
  }

  function reset() {
    //console.clear();
    var opcionesFilas = getOpciones(controles.rows);
    var opcionesColumnas = getOpciones(controles.columns);
    filas = _.max([1, opcionesFilas.length || 0]);
    columnas = _.max([1, opcionesColumnas.length || 0]);
    var puntosFiltrados = filtraPuntos();
    var puntosUnicos = _.uniq(_.map(puntosFiltrados, "ref_id"));
    var num = puntosUnicos.length;
    setCajas(puntosFiltrados);
    return num;
  }

  function filtraPuntos() {
    var puntosFiltrados = [];
    var opcionesFiltros =
      controles.filters === null ? [] : [controles.filters.value];
    var opcionesFilas = _.map(getOpciones(controles.rows), "value");
    var opcionesColumnas = _.map(getOpciones(controles.columns), "value");
    var celdas = {};

    puntosFiltrados = _.filter(desagregaPuntos(puntos), function (p) {
      var flagFiltros = false;
      var flagColumnas = false;
      var flagFilas = false;
      p.matriz = {
        m: 0,
        n: 0,
        num: null,
      };

      if (opcionesFiltros.length > 0) {
        flagFiltros = indiceEnOpciones(
          p[controles.filters.clave],
          opcionesFiltros
        );
      } else {
        flagFiltros = true;
      }

      if (opcionesColumnas.length > 0) {
        flagColumnas = indiceEnOpciones(
          p[controles.columns.clave],
          opcionesColumnas
        );
        p.matriz.n = indiceTemporal;
      } else {
        flagColumnas = true;
      }

      if (opcionesFilas.length > 0) {
        flagFilas = indiceEnOpciones(p[controles.rows.clave], opcionesFilas);
        p.matriz.m = indiceTemporal;
      } else {
        flagFilas = true;
      }

      if (flagFiltros && flagColumnas && flagFilas) {
        var clave = `${p.matriz.m}-${p.matriz.n}`;
        if (!celdas.hasOwnProperty(clave)) {
          celdas[clave] = 0;
        }
        p.matriz.num = celdas[clave];
        celdas[clave] = celdas[clave] + 1;
      }
      return flagFiltros && flagColumnas && flagFilas;
    });
    //TODO: El nest para agrupar circulitos
    /*
    clonsola.log("puntosFiltrados (pre)");
    clonsola.log(puntosFiltrados);
    puntosFiltrados = d3
      .nest()
      .key(function (d) {
        return d.ref_id;
      })
      .entries(puntosFiltrados); // --> nest DESPUÉS DE FILTRAR
    clonsola.log("puntosFiltrados (post)");
    clonsola.log(puntosFiltrados);
    */
    return puntosFiltrados;
  }

  //TODO: Esto está feo pero funciona de momento
  var indiceTemporal = -1;
  function indiceEnOpciones(arreglo, opciones) {
    if (!Array.isArray(arreglo)) {
      arreglo = [arreglo];
    }
    return arreglo.some(function (v) {
      indiceTemporal = opciones.indexOf(v);
      return indiceTemporal >= 0;
    });
  }

  function setCajas(puntosFiltrados) {
    setCajaPunto();
    setCajaOutcome();
    setCajaStudy();
    setCajaExplicacion();
    setCajaEncabezadoColumnas();
    setCajaTituloFilas();
    var ajusteX = cajaEncabezadoFilas.outer.width;
    emparejaCajasEncabezados();
    var ajusteY = cajaWrapperSuperior.outer.height;
    setCajaWrapperSuperior();
    setCajaEncabezadoFilas();
    setCajaPuntos();
    anchoColumna =
      controles.columns === null ? cajaPuntos.inner.width : anchoColumna;
    var filasMatriz = setFilasMatriz(puntosFiltrados);
    emparejaFilas(filasMatriz);
    var altura = filasMatriz.length > 0 ? filasMatriz[0].altura : 0;
    emparejaCajaPuntos(altura);
    setCajaSeparadores();
    setCajaRaiz();
    setSeparadores(filasMatriz);
    var celdas = setCeldas(filasMatriz, puntosFiltrados);
    //clonsola.log("celdas"); //volver
    //clonsola.log(celdas);
    var celdasLlenas = _.filter(celdas, function (c) {
      return c.puntos.length > 0;
    });
    var celdasVacias = _.filter(celdas, function (c) {
      return c.puntos.length <= 0;
    });
    setCeldasVacias(celdasVacias);
    setBotonCeldasLlenas(celdasLlenas);
    setPuntos({ x: ajusteX, y: ajusteY }, puntosFiltrados);
  }

  var cajaPunto = null;
  function setCajaPunto() {
    var radioCirculo =
      controles.rows !== null || controles.columns !== null ? 10 : 15;
    var margenCirculo =
      controles.rows !== null || controles.columns !== null ? 5 : 7;
    cajaPunto = new Box({
      content: { width: radioCirculo * 2, height: radioCirculo * 2 },
      margin: margenCirculo,
    });
  }

  function setCajaOutcome() {
    cajaOutcome = new Box();
  }

  function setCajaStudy() {
    cajaStudy = new Box();
  }

  function setCajaExplicacion() {
    cajaExplicacion = new Box();
  }

  function setCajaEncabezadoColumnas() {
    //clonsola.log("cajaTituloFilas");
    //clonsola.log(cajaTituloFilas);
    var arregloTitulo = [];
    var arregloColumnas = [];
    anchoColumna = 0;
    anchoColumnaTexto = 0;
    var tituloColumnas = gEncabezadoColumnas
      .selectAll("text.titulo.columna")
      .data(arregloTitulo);
    var etiquetasColumnas = gEncabezadoColumnas
      .selectAll("text.encabezado")
      .data(arregloColumnas);
    tituloColumnas.exit().remove();
    etiquetasColumnas.exit().remove();
    if (controles.rows === null) {
      anchoColumna = caja.content.width / columnas;
    } else {
      if (controles.columns === null) {
        anchoColumna = caja.content.width;
      } else {
        anchoColumna = caja.content.width / (columnas + 1);
      }
    }
    anchoColumnaTexto = anchoColumna - 2 * paddingEncabezadoH;
    if (controles.columns !== null) {
      var offsetX = 0;
      if (controles.rows !== null) {
        offsetX = anchoColumna;
      }
      gEncabezadoColumnas.attr("transform", `translate(${offsetX},0)`);
      arregloTitulo = [controles.columns];
      arregloColumnas = controles.columns.options;

      tituloColumnas = gEncabezadoColumnas
        .selectAll("text.titulo.columna")
        .data(arregloTitulo);
      tituloColumnas
        .enter()
        .append("text")
        .attr("class", "titulo columna")
        .attr(
          "transform",
          `translate(${paddingEncabezadoH},${paddingEncabezadoV})`
        )
        .text(function (d) {
          return d.label;
        })
        .call(guardaBBox);

      etiquetasColumnas = gEncabezadoColumnas
        .selectAll("text.encabezado")
        .data(arregloColumnas);
      etiquetasColumnas
        .enter()
        .append("text")
        .attr("class", "encabezado columna")
        .attr("transform", function (o, i) {
          return `translate(${
            i * anchoColumna + paddingEncabezadoH
          },${controles.columns.caja.height + 3 * paddingEncabezadoV})`;
        })
        .attr("x", 0)
        .attr("y", 0)
        .attr("dy", 0)
        .text(function (o) {
          return o.label;
        })
        .call(wrap, anchoColumnaTexto)
        .call(guardaBBox);
      var max = _.max(
        _.map(controles.columns.options, function (d) {
          return d.caja.height;
        })
      );
    }

    var anchoCaja =
      controles.columns === null
        ? 0
        : anchoColumna * controles.columns.options.length;
    var altoCaja =
      controles.columns === null
        ? 0
        : controles.columns.caja.height + max + 4 * paddingEncabezadoV;

    cajaEncabezadoColumnas = new Box({
      content: {
        width: anchoCaja,
        height: altoCaja,
      },
    });
    if (debug === true) {
      gEncabezadoColumnas
        .select("rect")
        .attr("height", cajaEncabezadoColumnas.content.height)
        .attr("width", cajaEncabezadoColumnas.content.width);
    }
  }

  function setCajaTituloFilas() {
    var arregloTitulo = [];
    var tituloFilas = gTituloFilas
      .selectAll("text.titulo.fila")
      .data(arregloTitulo);
    tituloFilas.exit().remove();
    if (controles.rows !== null) {
      arregloTitulo = [controles.rows];
      var offsetY = 0;
      if (controles.columns === null) {
        offsetY = paddingEncabezadoV;
      } else {
        offsetY = controles.columns.caja.height + paddingEncabezadoV;
      }
      tituloFilas = gTituloFilas
        .selectAll("text.titulo.fila")
        .data(arregloTitulo);
      tituloFilas
        .enter()
        .append("text")
        .attr("class", "titulo fila")
        .attr("transform", `translate(${paddingEncabezadoH},${offsetY})`)
        .text(function (d) {
          return d.label;
        })
        .attr("x", 0)
        .attr("y", 0)
        .attr("dy", 0)
        .call(wrap, anchoColumnaTexto)
        .call(guardaBBox);
    }
    var anchoCaja = controles.rows === null ? 0 : anchoColumna;
    var altoCaja = 0;
    if (controles.columns === null) {
      altoCaja =
        controles.rows === null
          ? 0
          : controles.rows.caja.height + 2 * paddingEncabezadoV;
    } else {
      altoCaja =
        controles.rows === null
          ? 0
          : controles.rows.caja.height +
            controles.columns.caja.height +
            paddingEncabezadoV;
    }
    cajaTituloFilas = new Box({
      content: {
        width: anchoCaja,
        height: altoCaja,
      },
    });
    if (debug === true) {
      gTituloFilas
        .select("rect")
        .attr("height", cajaTituloFilas.content.height)
        .attr("width", cajaTituloFilas.content.width);
    }
  }

  function emparejaCajasEncabezados() {
    if (controles.rows !== null && controles.columns !== null) {
      var alto = 0;
      var ancho = 0;
      if (cajaEncabezadoColumnas.inner.height > cajaTituloFilas.inner.height) {
        alto = cajaEncabezadoColumnas.inner.height;
        ancho = cajaTituloFilas.inner.width;
        cajaTituloFilas = new Box({
          content: {
            width: ancho,
            height: alto,
          },
        });
      }
      if (cajaTituloFilas.inner.height > cajaEncabezadoColumnas.inner.height) {
        alto = cajaTituloFilas.inner.height;
        ancho = cajaEncabezadoColumnas.inner.width;
        cajaEncabezadoColumnas = new Box({
          content: {
            width: ancho,
            height: alto,
          },
        });
      }
      if (debug === true) {
        gEncabezadoColumnas
          .select("rect")
          .attr("height", cajaEncabezadoColumnas.content.height)
          .attr("width", cajaEncabezadoColumnas.content.width);
        gTituloFilas
          .select("rect")
          .attr("height", cajaTituloFilas.content.height)
          .attr("width", cajaTituloFilas.content.width);
      }
    }
  }

  function setCajaWrapperSuperior() {
    var alto = 0;
    if (cajaOutcome.inner.height !== 0 || cajaStudy.inner.height !== 0) {
      alto += _.max([cajaOutcome.inner.height, cajaStudy.inner.height]);
    }
    if (cajaExplicacion.inner.height !== 0) {
      alto += cajaExplicacion.inner.height;
    }
    if (
      cajaTituloFilas.inner.height !== 0 ||
      cajaEncabezadoColumnas.inner.height !== 0
    ) {
      alto += _.max([
        cajaTituloFilas.inner.height,
        cajaEncabezadoColumnas.inner.height,
      ]);
    }
    var ancho = alto === 0 ? 0 : caja.content.width;
    cajaWrapperSuperior = new Box({ content: { width: ancho, height: alto } });
    if (debug === true) {
      gWrapperSuperior
        .select("rect")
        .attr("height", cajaWrapperSuperior.content.height)
        .attr("width", cajaWrapperSuperior.content.width);
    }
  }

  function setCajaEncabezadoFilas() {
    var arregloFilas = [];
    gEncabezadoFilas.attr(
      "transform",
      `translate(0,${cajaWrapperSuperior.outer.height})`
    );
    var etiquetasFilas = gEncabezadoFilas
      .selectAll("text.encabezado")
      .data(arregloFilas);
    etiquetasFilas.exit().remove();
    if (controles.rows !== null) {
      arregloFilas = controles.rows.options;
      etiquetasFilas = gEncabezadoFilas
        .selectAll("text.encabezado")
        .data(arregloFilas);

      etiquetasFilas
        .enter()
        .append("text")
        .attr("class", "encabezado fila")
        .attr("transform", `translate(${paddingEncabezadoH},0)`)
        .text(function (d) {
          return d.label;
        })
        .attr("x", 0)
        .attr("y", 0)
        .attr("dy", 0)
        .call(wrap, anchoColumnaTexto)
        .call(guardaBBox)
        .call(ajustaAlturaEncabezadoFilas);
    }

    var ancho = 0;
    var alto = 0;
    ancho = controles.rows === null ? 0 : anchoColumna;
    if (controles.rows !== null) {
      var arreglo = [];
      if (controles.columns === null) {
        arreglo = _.map(controles.rows.options, function (o) {
          return o.box.outer.width;
        });
        ancho = _.max(arreglo);
      }
      arreglo = _.map(controles.rows.options, function (o) {
        return o.box.outer.height;
      });
      alto = _.sum(arreglo);
    }
    cajaEncabezadoFilas = new Box({ content: { width: ancho, height: alto } });

    if (debug === true) {
      gEncabezadoFilas
        .select("rect")
        .attr("height", cajaEncabezadoFilas.content.height)
        .attr("width", cajaEncabezadoFilas.content.width);
    }
  }

  function setCajaPuntos() {
    cajaPuntos = new Box({
      content: {
        width: caja.content.width - cajaEncabezadoFilas.outer.width,
        height: caja.content.height - cajaWrapperSuperior.outer.height,
      },
    });
    gPuntos.attr(
      "transform",
      `translate(${cajaEncabezadoFilas.outer.width},${cajaWrapperSuperior.outer.height})`
    );
    gCeldas.attr(
      "transform",
      `translate(${cajaEncabezadoFilas.outer.width},${cajaWrapperSuperior.outer.height})`
    );
    gBotones.attr(
      "transform",
      `translate(${cajaEncabezadoFilas.outer.width},${cajaWrapperSuperior.outer.height})`
    );

    if (debug === true) {
      gPuntos
        .select("rect")
        .attr("height", cajaPuntos.inner.height)
        .attr("width", cajaPuntos.inner.width);
    }
  }

  //TODO: Agregar botones
  function setFilasMatriz(puntosFiltrados) {
    var filasMatriz = [];
    var anchoCelda = cajaPuntos.outer.width / columnas;
    var puntosPorFila = _.groupBy(puntosFiltrados, function (p) {
      return p.matriz.m;
    });
    var puntosPorFilaCelda = _.min([
      _.floor(anchoCelda / cajaPunto.outer.width),
      maxPuntosPorFila,
    ]);
    var paddingCeldaH =
      (anchoColumna - puntosPorFilaCelda * cajaPunto.outer.width) / 2;
    var paddingCeldaV =
      controles.rows === null && controles.columns === null
        ? paddingCeldaH / 4
        : paddingEncabezadoV;
    _.each(puntosPorFila, function (arreglo, fila) {
      var puntosPorColumna = _.groupBy(arreglo, function (p) {
        return p.matriz.n;
      });
      var puntos = _.max(_.values(puntosPorColumna)).length;
      var filas = _.ceil(
        _.max(_.values(puntosPorColumna)).length / puntosPorFilaCelda
      );
      var altura =
        2 * paddingCeldaV +
        _.ceil(_.max(_.values(puntosPorColumna)).length / puntosPorFilaCelda) *
          cajaPunto.outer.height;
      var offset =
        puntos % puntosPorFilaCelda === 0 ? cajaBotones.outer.height : 0;
      var offsetP =
        offset === 0 ? cajaBotones.outer.height - cajaPunto.outer.height : 0;
      filasMatriz.push({
        fila: parseInt(fila),
        puntos: puntos,
        filas: filas,
        altura: altura + offset + offsetP,
        puntosPorFila: puntosPorFilaCelda,
        paddingCeldaH: paddingCeldaH,
        paddingCeldaV: paddingCeldaV,
        offset: offset,
      });
    });
    _.each(puntosFiltrados, function (punto) {
      var i = _.floor(punto.matriz.num / puntosPorFilaCelda);
      var j = punto.matriz.num % puntosPorFilaCelda;
      punto.celda = null;
      punto.celda = {
        i: i,
        j: j,
        paddingX: paddingCeldaH,
        paddingY: paddingCeldaV,
      };
    });
    return filasMatriz;
  }

  function emparejaFilas(filasMatriz) {
    if (controles.rows !== null) {
      _.each(filasMatriz, function (fila) {
        var i = fila.fila;
        var altura = fila.altura;
        var opcion = controles.rows.options[i];
        if (altura > opcion.box.outer.height) {
          opcion.box = new Box({
            content: {
              width: opcion.box.content.width,
              height: altura - 2 * paddingEncabezadoV,
            },
            padding: {
              top: paddingEncabezadoV,
              right: paddingEncabezadoH,
              bottom: paddingEncabezadoV,
              left: paddingEncabezadoH,
            },
          });
        }
      });
      var acumulable = 0;
      _.each(controles.rows.options, function (opcion) {
        opcion.posicion = { y: acumulable };
        acumulable += opcion.box.outer.height;
      });
      gEncabezadoFilas
        .selectAll("text.encabezado")
        .attr("transform", function (d) {
          return `translate(${paddingEncabezadoH},${paddingEncabezadoV + d.posicion.y})`;
        });
      cajaEncabezadoFilas = new Box({
        content: {
          width: cajaEncabezadoFilas.content.width,
          height: acumulable,
        },
      });
      if (debug === true) {
        gEncabezadoFilas
          .select("rect")
          .attr("height", cajaEncabezadoFilas.inner.height);
      }
    }
  }

  function emparejaCajaPuntos(altura) {
    altura =
      controles.rows === null ? altura : cajaEncabezadoFilas.content.height;
    cajaPuntos = new Box({
      content: {
        width: cajaPuntos.content.width,
        height: altura,
      },
    });
    if (debug === true) {
      gPuntos.select("rect").attr("height", cajaPuntos.outer.height);
    }
  }

  function setCajaSeparadores() {
    cajaSeparadores = new Box({
      content: {
        width: cajaPuntos.content.width,
        height: cajaPuntos.content.height,
      },
    });
    gSeparadores.attr(
      "transform",
      `translate(${cajaEncabezadoFilas.outer.width},${cajaWrapperSuperior.outer.height})`
    );
    if (debug === true) {
      gSeparadores
        .select("rect")
        .attr("height", cajaSeparadores.inner.height)
        .attr("width", cajaSeparadores.inner.width);
    }
  }

  function setCajaRaiz() {
    caja = new Box({
      content: {
        width: caja.content.width,
        height: cajaWrapperSuperior.outer.height + cajaPuntos.outer.height,
      },
      padding: 10,
    });
    raiz
      .transition()
      .ease(d3.easeQuadOut)
      .duration(ms)
      .attr("viewBox", [0, 0, caja.outer.width, caja.outer.height]);
    if (debug === true) {
      raiz.select("rect").attr("height", caja.outer.height);
      svg.select("rect").attr("height", caja.content.height);
    }
  }

  //TODO: Checar la separación entrelíneas hacia arriba
  function setSeparadores(filasMatriz) {
    //gSeparadores.selectAll("line").remove();
    var arreglo = [];
    if (controles.rows !== null) {
      arreglo = _.map(controles.rows.options, function (o) {
        return o.posicion.y;
      });
      arreglo.push(cajaPuntos.outer.height);
    }

    var lineasF = gSeparadores.selectAll("line.fila").data(arreglo);

    lineasF
      .enter()
      .append("line")
      .attr("class", "fila")
      .attr("x1", -cajaEncabezadoFilas.outer.width + paddingEncabezadoH)
      .attr("x2", cajaPuntos.outer.width)
      .attr("y1", function (d) {
        return d;
      })
      .attr("y2", function (d) {
        return d;
      })
      .attr("stroke", "black")
      .attr("stroke-width", "1px");

    lineasF
      .attr("x1", -cajaEncabezadoFilas.outer.width + paddingEncabezadoH)
      .attr("x2", cajaPuntos.outer.width)
      .attr("y1", function (d) {
        return d;
      })
      .attr("y2", function (d) {
        return d;
      });

    lineasF.exit().remove();

    var arregloColumnas = [];
    if (controles.columns !== null && columnas > 1) {
      var j = 0;
      if (controles.rows === null) {
        j = 1;
      }
      for (j; j < columnas; j++) {
        arregloColumnas.push(j);
      }
    }

    var lineasC = gSeparadores.selectAll("line.columna").data(arregloColumnas);

    lineasC
      .enter()
      .append("line")
      .attr("class", "columna")
      .attr("x1", function (d) {
        return d * anchoColumna;
      })
      .attr("x2", function (d) {
        return d * anchoColumna;
      })
      .attr("y1", function (d, i) {
        var offset = controles.rows !== null && i === 0 ? 0 : 27;
        return -cajaWrapperSuperior.outer.height + paddingEncabezadoV + offset;
      })
      .attr("y2", cajaPuntos.outer.height)
      .attr("stroke", "black")
      .attr("stroke-width", "1px");

    lineasC
      .attr("x1", function (d) {
        return d * anchoColumna;
      })
      .attr("x2", function (d) {
        return d * anchoColumna;
      })
      .attr("y1", function (d, i) {
        var offset = controles.rows !== null && i === 0 ? 0 : 27;
        return -cajaWrapperSuperior.outer.height + paddingEncabezadoV + offset;
      })
      .attr("y2", cajaPuntos.outer.height);

    lineasC.exit().remove();
  }

  //TODO: Rechecar esto
  function setCeldas(filasMatriz, puntosFiltrados) {
    var puntosAgrupados = _.groupBy(puntosFiltrados, function (d) {
      return `${d.matriz.m}-${d.matriz.n}`;
    });

    var arreglo = [];
    if (controles.rows !== null) {
      arreglo = _.map(controles.rows.options, function (o) {
        return o.posicion.y;
      });
    }

    var arregloAlturas = [];
    if (controles.rows !== null) {
      arregloAlturas = _.map(controles.rows.options, function (o) {
        return o.posicion.y;
      });
      arregloAlturas.push(cajaPuntos.outer.height);
    } else {
      arregloAlturas.push(0);
      arregloAlturas.push(cajaPuntos.outer.height);
    }

    var m = 0;
    var n = 0;
    var clave = null;
    var puntos = null;
    var x = null;
    var y = null;
    var width = null;
    var height = null;
    var celdas = [];
    var info = {};
    for (m = 0; m < filas; m++) {
      for (n = 0; n < columnas; n++) {
        clave = `${m}-${n}`;
        x = n * anchoColumna;
        y = arreglo[m] || 0;
        width = anchoColumna;
        height = arregloAlturas[m + 1] || 0;
        puntos = puntosAgrupados[clave] || [];
        info = _.find(filasMatriz, { fila: m }) || {};
        celdas.push({
          m: m,
          n: n,
          puntos: puntos,
          coordenadas: { x: x, y: y },
          medidas: { ancho: width, alto: height - y },
          puntosPorFila: info.puntosPorFila || 0,
          paddingCeldaH: info.paddingCeldaH || 0,
          paddingCeldaV: info.paddingCeldaV || 0,
        });
      }
    }
    return celdas;
  }

  function setCeldasVacias(celdas) {
    var rects = gCeldas.selectAll("rect").data(celdas);
    rects
      .enter()
      .append("rect")
      .attr("class", "vacia")
      .attr("transform", function (d) {
        return `translate(${d.coordenadas.x},${d.coordenadas.y})`;
      })
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", function (d) {
        return d.medidas.ancho;
      })
      .attr("height", function (d) {
        return d.medidas.alto;
      });

    rects
      .attr("transform", function (d) {
        return `translate(${d.coordenadas.x},${d.coordenadas.y})`;
      })
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", function (d) {
        return d.medidas.ancho;
      })
      .attr("height", function (d) {
        return d.medidas.alto;
      });

    rects.exit().remove();

    gCeldas.selectAll("text.vacia").data([]).exit().remove();

    var textos = gCeldas.selectAll("text.vacia").data(celdas);

    textos
      .enter()
      .append("text")
      .attr("class", "vacia")
      .attr("transform", function (d) {
        return `translate(${d.coordenadas.x},${d.coordenadas.y})`;
      })
      .attr("x", 0)
      .attr("y", 0)
      .attr("dy", 0)
      .text("No studies in this category")
      .call(wrap, anchoColumnaTexto)
      .call(guardaBBox)
      .call(ajustaTextoCeldaVacia);

    //textos.exit().remove();
  }

  //TODO: Asignar el evento al click de la celda/botón
  //TODO: Rechecar esto porque tampoco quedó chido cuando no hay nada seleccionado
  function setBotonCeldasLlenas(celdas) {
    //clonsola.dir(celdas[14]);
    if (controles.rows !== null || controles.columns !== null) {
      var botones = gBotones.selectAll("rect.boton").data(celdas);
      botones
        .enter()
        .append("rect")
        .attr("class", "boton")
        .attr("transform", function (d) {
          return `translate(${d.coordenadas.x},${d.coordenadas.y})`;
        })
        .attr("width", cajaBotones.content.width)
        .attr("height", cajaBotones.content.height)
        .attr("x", function (d) {
          return (
            d.paddingCeldaH +
            cajaPunto.outer.width * (d.puntosPorFila - 1) +
            cajaBotones.margin.left
          );
        })
        .attr("y", function (d) {
          return (
            d.paddingCeldaV +
            cajaPunto.outer.height *
              _.floor(d.puntos.length / d.puntosPorFila) +
            cajaBotones.margin.top
          );
        })
        .attr("rx", 5)
        .attr("ry", 5)
        .on("click", function (d) {
          var columna = null;
          var fila = null;
          if (controles.rows !== null) {
            fila = controles.rows.options[d.m].label;
          }
          if (controles.columns !== null) {
            columna = controles.columns.options[d.n].label;
          }
          var ids = _.uniq(_.map(d.puntos, "ref_id"));
          $("body").trigger("lista:mostrar", [ids, fila, columna]);
        });

      botones
        .attr("transform", function (d) {
          return `translate(${d.coordenadas.x},${d.coordenadas.y})`;
        })
        .attr("x", function (d) {
          return (
            d.paddingCeldaH +
            cajaPunto.outer.width * (d.puntosPorFila - 1) +
            cajaBotones.margin.left
          );
        })
        .attr("y", function (d) {
          return (
            d.paddingCeldaV +
            cajaPunto.outer.height *
              _.floor(d.puntos.length / d.puntosPorFila) +
            cajaBotones.margin.top
          );
        });

      botones.exit().remove();

      var tamanioLista = 21;
      var listas = gBotones.selectAll("image.boton").data(celdas);
      listas
        .enter()
        .append("svg:image")
        .attr("class", "boton")
        .attr("transform", function (d) {
          return `translate(${d.coordenadas.x},${d.coordenadas.y})`;
        })
        .attr("x", function (d) {
          return (
            d.paddingCeldaH +
            cajaPunto.outer.width * (d.puntosPorFila - 1) +
            cajaBotones.margin.left +
            (cajaBotones.content.width - tamanioLista) / 2
          );
        })
        .attr("y", function (d) {
          return (
            d.paddingCeldaV +
            cajaPunto.outer.height *
              _.floor(d.puntos.length / d.puntosPorFila) +
            cajaBotones.margin.top +
            (cajaBotones.content.height - tamanioLista) / 2
          );
        })
        .attr("width", tamanioLista)
        .attr("height", tamanioLista)
        .attr("xlink:href", "img/export.svg");

      listas
        .attr("transform", function (d) {
          return `translate(${d.coordenadas.x},${d.coordenadas.y})`;
        })
        .attr("x", function (d) {
          return (
            d.paddingCeldaH +
            cajaPunto.outer.width * (d.puntosPorFila - 1) +
            cajaBotones.margin.left +
            (cajaBotones.content.width - tamanioLista) / 2
          );
        })
        .attr("y", function (d) {
          return (
            d.paddingCeldaV +
            cajaPunto.outer.height *
              _.floor(d.puntos.length / d.puntosPorFila) +
            cajaBotones.margin.top +
            (cajaBotones.content.height - tamanioLista) / 2
          );
        });

      listas.exit().remove();
    } else {
      gBotones.selectAll("rect.boton").data([]).exit().remove();
      gBotones.selectAll("image.boton").data([]).exit().remove();
    }
  }

  function setBotonCeldasLlenas0(celdas) {
    if (controles.rows !== null || controles.columns !== null) {
      var anchoCelda = cajaPuntos.outer.width / columnas;
      var puntosPorFilaCelda = _.min([
        _.floor(anchoCelda / cajaPunto.outer.width),
        maxPuntosPorFila,
      ]);
      var paddingCeldaH =
        (anchoColumna - puntosPorFilaCelda * cajaPunto.outer.width) / 2;

      cajaBotones = new Box({
        content: {
          width: cajaBotones.content.width,
          height: cajaBotones.content.height,
        },
        margin: cajaBotones.margin,
        padding: cajaBotones.padding,
      });

      var botones = gBotones.selectAll("rect.boton").data(celdas);
      botones
        .enter()
        .append("rect")
        .attr("class", "boton")
        .attr("transform", function (d) {
          return `translate(${d.coordenadas.x},${d.coordenadas.y})`;
        })
        .attr("width", cajaBotones.content.width)
        .attr("height", cajaBotones.content.height)
        .attr(
          "x",
          anchoColumna -
            (cajaBotones.content.height +
              paddingCeldaH +
              cajaPunto.padding.right +
              cajaPunto.margin.right)
        )
        .attr("y", function (d) {
          return d.medidas.alto - cajaBotones.outer.height / 2;
        })
        .attr("rx", 5)
        .attr("ry", 5)
        .on("click", function (d) {
          var columna = null;
          var fila = null;
          if (controles.rows !== null) {
            fila = controles.rows.options[d.m].label;
          }
          if (controles.columns !== null) {
            columna = controles.columns.options[d.n].label;
          }
          var ids = _.uniq(_.map(d.puntos, "ref_id"));
          $("body").trigger("lista:mostrar", [ids, fila, columna]);
        });

      botones
        .attr("transform", function (d) {
          return `translate(${d.coordenadas.x},${d.coordenadas.y})`;
        })
        .attr(
          "x",
          anchoColumna -
            (cajaBotones.content.height +
              paddingCeldaH +
              cajaPunto.padding.right +
              cajaPunto.margin.right)
        )
        .attr("y", function (d) {
          return d.medidas.alto - cajaBotones.outer.height / 2;
        })
        .attr("rx", 5)
        .attr("ry", 5);

      botones.exit().remove();

      /*
      var botones = gBotones.selectAll("circle.boton").data(celdas);

      botones
        .enter()
        .append("circle")
        .attr("class", "boton")
        .attr("transform", function (d) {
          return `translate(${d.coordenadas.x},${d.coordenadas.y})`;
        })
        .attr("r", cajaBotones.content.height / 2)
        .attr("cx", anchoColumna / 2)
        .attr(
          "cx",
          anchoColumna -
            (cajaBotones.content.height / 2 +
              paddingCeldaH +
              cajaPunto.padding.right +
              cajaPunto.margin.right)
        )
        .attr("cy", function (d) {
          return d.medidas.alto - cajaBotones.outer.height / 2;
        })
        .on("click", function (d) {
          var columna = null;
          var fila = null;
          if (controles.rows !== null) {
            fila = controles.rows.options[d.m].label;
          }
          if (controles.columns !== null) {
            columna = controles.columns.options[d.n].label;
          }
          var ids = _.uniq(_.map(d.puntos, "ref_id"));
          $("body").trigger("lista:mostrar", [ids, fila, columna]);
        });

      botones
        .attr("transform", function (d) {
          return `translate(${d.coordenadas.x},${d.coordenadas.y})`;
        })
        .attr("cx", anchoColumna / 2)
        .attr(
          "cx",
          anchoColumna -
            (cajaBotones.content.height / 2 +
              paddingCeldaH +
              cajaPunto.padding.right +
              cajaPunto.margin.right)
        )
        .attr("cy", function (d) {
          return d.medidas.alto - cajaBotones.outer.height / 2;
        });

      botones.exit().remove();
      */

      var tamanioLista = 24;
      var listas = gBotones.selectAll("image.boton").data(celdas);
      listas
        .enter()
        .append("svg:image")
        .attr("class", "boton")
        .attr("transform", function (d) {
          return `translate(${d.coordenadas.x},${d.coordenadas.y})`;
        })
        .attr("x", (anchoColumna - tamanioLista) / 2)
        .attr(
          "x",
          anchoColumna -
            (cajaBotones.content.width +
              paddingCeldaH +
              cajaPunto.padding.right +
              cajaPunto.margin.right) +
            (cajaBotones.content.width - cajaPunto.content.width) / 2
        )
        .attr("y", function (d) {
          return (
            d.medidas.alto - cajaBotones.outer.height / 2 - tamanioLista / 2
          );
        })
        .attr("y", function (d) {
          return (
            d.medidas.alto -
            cajaBotones.outer.height / 2 +
            (cajaBotones.content.height - tamanioLista) / 2
          );
        })
        .attr("width", tamanioLista)
        .attr("height", tamanioLista)
        .attr("xlink:href", "img/export.svg");

      listas
        .attr("transform", function (d) {
          return `translate(${d.coordenadas.x},${d.coordenadas.y})`;
        })
        .attr("x", (anchoColumna - tamanioLista) / 2)
        .attr(
          "x",
          anchoColumna -
            (cajaBotones.content.width +
              paddingCeldaH +
              cajaPunto.padding.right +
              cajaPunto.margin.right) +
            (cajaBotones.content.width - cajaPunto.content.width) / 2
        )
        .attr("y", function (d) {
          return (
            d.medidas.alto - cajaBotones.outer.height / 2 - tamanioLista / 2
          );
        })
        .attr("y", function (d) {
          return (
            d.medidas.alto -
            cajaBotones.outer.height / 2 +
            (cajaBotones.content.height - tamanioLista) / 2
          );
        });

      listas.exit().remove();
    } else {
      //gBotones.selectAll("circle.boton").data([]).exit().remove();
      gBotones.selectAll("rect.boton").data([]).exit().remove();
      gBotones.selectAll("image.boton").data([]).exit().remove();
    }
  }

  //TODO:Rehacer toda esta pate porque yuck
  /*
  Para multiple arms
  https://stackoverflow.com/questions/32750613/svg-draw-a-circle-with-4-sectors/49226211
  https://www.smashingmagazine.com/2019/03/svg-circle-decomposition-paths/
  */

  //Aquí está el asunto para re-ordenar con respecto a calidad y demás cosas...
  //TODO:Hacer que se ordene por columnas cuando se quiera ver study quality
  function setPuntos(anteriores, puntosFiltrados) {
    var color = "#9595b4";
    var orden = 0;
    if (controles.rows !== null) {
      _.each(puntosFiltrados, function (p) {
        if (p.multiples === true) {
          color = "url(#mitades)";
          orden = 4;
        } else {
          var opcion = controles.rows.options[p.matriz.m];
          var clave = opcion.key;
          var valor = p[clave] || null;
          valor = valor === null ? "" : limpiaCadena(p[clave]).toLowerCase();
          switch (valor) {
            case "positive":
              color = "#003a8f";
              orden = 1;
              break;
            case "negative":
              color = "#f16d75";
              orden = 2;
              break;
            case "mixed results":
              color = "url(#degradado)";
              orden = 3;
              break;
            case "no effect":
            case "no significant difference":
              color = "#939ba1";
              orden = 5;
              break;
            default:
              color = "black";
              color = "#939ba1";
              orden = 6;
              //clonsola.log(`${p.ref_id}: ${valor} - ${color} - ${orden}`);
              break;
          }
        }
        p.color = color;
        p.orden = orden;
      });

      //TODO: Lo del reorden por color está acá
      //TODO: Por acá tambiénestá lo de reordenar por study_quality
      puntosFiltrados.sort(function (a, b) {
        return a.orden - b.orden;
      });
      var celdas = {};
      _.each(puntosFiltrados, function (p) {
        var clave = `${p.matriz.m}-${p.matriz.n}`;
        if (!celdas.hasOwnProperty(clave)) {
          celdas[clave] = 0;
        }
        p.matriz.num = celdas[clave];
        celdas[clave] = celdas[clave] + 1;
      });

      var anchoCelda = cajaPuntos.outer.width / columnas;
      var puntosPorFilaCelda = _.min([
        _.floor(anchoCelda / cajaPunto.outer.width),
        maxPuntosPorFila,
      ]);
      var paddingCeldaH =
        (anchoColumna - puntosPorFilaCelda * cajaPunto.outer.width) / 2;
      var paddingCeldaV =
        controles.rows === null && controles.columns === null
          ? paddingCeldaH / 4
          : paddingEncabezadoV;

      _.each(puntosFiltrados, function (punto) {
        var i = _.floor(punto.matriz.num / puntosPorFilaCelda);
        var j = punto.matriz.num % puntosPorFilaCelda;
        punto.celda = null;
        punto.celda = {
          i: i,
          j: j,
          paddingX: paddingCeldaH,
          paddingY: paddingCeldaV,
        };
      });
    } else {
      _.each(puntosFiltrados, function (p) {
        p.color = color;
        p.orden = 0;
      });
    }

    //TODO: Acá abajo está chido, lo que se agregó para colores es lo de arribita
    var actuales = {
      x: cajaEncabezadoFilas.outer.width,
      y: cajaWrapperSuperior.outer.height,
    };
    var offsetX = actuales.x - anteriores.x;
    var offsetY = actuales.y - anteriores.y;

    setCajaPunto();
    /*
    clonsola.log(_.map(puntosFiltrados, "id"));
    clonsola.log(_.uniq(_.map(puntosFiltrados, "id")));
*/
    _.each(puntosFiltrados, function (p) {
      var obj = memoriaPuntos[p.id] || null;
      if (obj !== null) {
        p.anteriores = obj.anteriores;
        p.coordenadas = obj.coordenadas;
      }
    });

    var circulos = gPuntos
      .selectAll("circle.study_dots")
      .data(puntosFiltrados, function (d) {
        return d.id;
      });
    /*
    clonsola.log("enter");
    clonsola.log(circulos.enter());

    clonsola.log("update");
    clonsola.log(circulos.enter());

    clonsola.log("exit");
    clonsola.log(circulos.exit());
*/
    circulos
      .enter()
      .each(function (d) {
        d.coordenadas = { x: calculaPosicionX(d), y: calculaPosicionY(d) };
        d.anteriores = { x: 0, y: 0 };
      })
      .append("circle")
      .attr("id", function (d, i) {
        return `study_${d.ref_id}_${i}`;
      })
      .attr("class", "study_dots")
      .attr("fill", function (d) {
        return d.color;
      })
      .attr("r", 0)
      .attr("cx", function (d) {
        return d.coordenadas.x;
      })
      .attr("cy", function (d) {
        return d.coordenadas.y;
      })
      .each(function (d) {
        $(d3.select(this).node()).tooltipster().tooltipster("content", d.title);
      })
      .on("click", function (d) {
        $("body").trigger("articulo:mostrar", [d.ref_id]);
      })
      .transition()
      .ease(d3.easeQuadOut)
      .duration(ms)
      .attr("r", cajaPunto.content.width / 2);

    circulos
      .attr("cx", function (d) {
        d.coordenadas.x = d.coordenadas.x - offsetX;
        d.anteriores.x = d.coordenadas.x;
        return d.coordenadas.x;
      })
      .attr("cy", function (d) {
        d.coordenadas.y = d.coordenadas.y - offsetY;
        d.anteriores.y = d.coordenadas.y;
        return d.coordenadas.y;
      })
      .transition()
      .ease(d3.easeQuadOut)
      .duration(ms)
      .attr("r", cajaPunto.content.width / 2)
      .attr("fill", function (d) {
        return d.color;
      })
      .attr("cx", function (d) {
        d.coordenadas.x = calculaPosicionX(d);
        return d.coordenadas.x;
      })
      .attr("cy", function (d) {
        d.coordenadas.y = calculaPosicionY(d);
        return d.coordenadas.y;
      });

    circulos
      .exit()
      .each(function (d) {})
      .attr("cx", function (d) {
        d.coordenadas.x = d.coordenadas.x - offsetX;
        return d.coordenadas.x;
      })
      .attr("cy", function (d) {
        d.coordenadas.y = d.coordenadas.y - offsetY;
        return d.coordenadas.y;
      })
      .transition()
      .ease(d3.easeQuadOut)
      .duration(ms)
      .attr("fill", function (d) {
        return d.color;
      })
      .attr("r", 0)
      .remove();

    memoriaPuntos = {};
    _.each(puntosFiltrados, function (p) {
      memoriaPuntos[p.id] = {
        anteriores: p.anteriores,
        coordenadas: p.coordenadas,
      };
    });

    if (controles.switch === null) {
      gPuntos
        .selectAll("image")
        .data([], function (d) {
          return d.id;
        })
        .exit()
        .remove();
    } else {
      var tamanioBarras =
        controles.rows !== null || controles.columns !== null
          ? cajaPunto.outer.height * 0.5
          : cajaPunto.outer.height * 0.3;

      var barras = gPuntos
        .selectAll("image.quality")
        .data(puntosFiltrados, function (d) {
          return d.id;
        });

      barras
        .enter()
        .append("svg:image")
        .attr("class", "quality")
        .attr("x", function (d) {
          return d.coordenadas.x;
        })
        .attr("y", function (d) {
          return d.coordenadas.y;
        })
        .attr("width", 0)
        .attr("height", 0)
        .attr("xlink:href", function (d) {
          var clave = controles.switch.clave;
          var nombre = d[clave].toLowerCase();
          return `img/${nombre}.svg`;
        })
        .transition()
        .ease(d3.easeQuadOut)
        .duration(ms)
        .attr("x", function (d) {
          return d.coordenadas.x - tamanioBarras / 2;
        })
        .attr("y", function (d) {
          return d.coordenadas.y - tamanioBarras / 2;
        })
        .attr("width", tamanioBarras)
        .attr("height", tamanioBarras);

      barras
        .attr("x", function (d) {
          return d.anteriores.x - tamanioBarras / 2;
        })
        .attr("y", function (d) {
          return d.anteriores.y - tamanioBarras / 2;
        })
        .transition()
        .ease(d3.easeQuadOut)
        .duration(ms)
        .attr("x", function (d) {
          return d.coordenadas.x - tamanioBarras / 2;
        })
        .attr("y", function (d) {
          return d.coordenadas.y - tamanioBarras / 2;
        })
        .attr("width", tamanioBarras)
        .attr("height", tamanioBarras);

      barras.exit().remove();
    }
  }

  function calculaPosicionX(d) {
    var ancho = anchoColumna || cajaPuntos.content.width;
    return (
      ancho * d.matriz.n +
      d.celda.j * cajaPunto.outer.width +
      cajaPunto.outer.width / 2 +
      d.celda.paddingX
    );
  }

  function calculaPosicionY(d) {
    var altura =
      controles.rows === null
        ? 0
        : controles.rows.options[d.matriz.m].posicion.y;
    return (
      altura +
      d.celda.i * cajaPunto.outer.height +
      cajaPunto.outer.height / 2 +
      d.celda.paddingY
    );
  }

  function guardaBBox(opciones) {
    opciones.each(function (o) {
      var text = d3.select(this);
      o.caja = text.node().getBBox();
    });
  }

  function ajustaAlturaEncabezadoFilas(opciones) {
    var offsetY = 0;
    opciones.each(function (o, i) {
      var text = d3.select(this);
      o.box = new Box({
        content: { width: o.caja.width, height: o.caja.height },
        padding: {
          top: paddingEncabezadoV,
          right: paddingEncabezadoH,
          bottom: paddingEncabezadoV,
          left: paddingEncabezadoH,
        },
      });
      text.attr(
        "transform",
        `translate(${paddingEncabezadoH},${offsetY + paddingEncabezadoV})`
      );
      offsetY += o.box.outer.height;
    });
  }

  function ajustaTextoCeldaVacia(textos) {
    textos.each(function (t, i) {
      var text = d3.select(this);
      var anchoTexto = t.caja.width;
      var altoTexto = t.caja.height;
      var anchoCaja = t.medidas.ancho;
      var altoCaja = t.medidas.alto;
      var offsetX = (anchoCaja - anchoTexto) / 2;
      var offsetY = (altoCaja - altoTexto) / 2;
      text.attr(
        "transform",
        `translate(${t.coordenadas.x + offsetX},${t.coordenadas.y + offsetY})`
      );
    });
  }

  function getOpciones(obj) {
    obj = obj || null;
    var arreglo = [];
    if (obj !== null) {
      arreglo = obj.options;
    }
    return arreglo;
  }

  //TODO: Checar que tranza entre label vs value con Early childhood education and development
  function setMenu(menu) {
    menu = he.decode(menu);
    var opcion = _.find(opcionesMenu, { menu: menu }) || null;
    if (opcion !== null) {
      var obj = null;
      var tipo = opcion.tipo;
      var clave = opcion.clave;
      var opc = opcion.opcion;
      if (opc === true) {
        var arreglo = diccionario[tipo][clave].options;
        obj = _.find(arreglo, { value: menu }) || null;
      } else {
        obj = diccionario[tipo][clave];
      }
      obj.tipo = tipo;
      obj.clave = clave;
      obj.opcion = opc;
      controles[tipo] = obj;
    }
    var n = reset();
    return n;
  }

  function unsetMenu(menu) {
    menu = he.decode(menu);
    var opcion = _.find(opcionesMenu, { menu: menu }) || null;
    if (opcion !== null) {
      var tipo = opcion.tipo;
      if (opcion.opcion === true) {
        if (controles[tipo] !== null) {
          if (controles[tipo].label == menu) {
            controles[tipo] = null;
          }
        }
      } else {
        if (controles[tipo] !== null) {
          if (controles[tipo].menu == menu) {
            controles[tipo] = null;
          }
        }
      }
    }
    var n = reset();
    return n;
  }

  function limpiaCadena(cadena) {
    cadena = _.trim(cadena);
    //cadena = cadena.replace(/\/+/g, ", ");
    cadena = he.decode(cadena);
    return cadena == "" ? null : cadena;
  }

  function convierteCadenaAArreglo(cadena, ajustarOtro) {
    var coma = /,\s+/g;
    var barra = /\|/g;
    var arreglo = [];
    cadena = _.trim(cadena);
    //cadena = cadena.replace(/\/+/g, ", ");
    cadena = he.decode(cadena);
    ajustarOtro = ajustarOtro || false;
    if (cadena != "") {
      arreglo = cadena
        .replace(coma, "|")
        .split(",")
        .map(function (c) {
          return c.replace(barra, ", ");
        });
    }
    if (ajustarOtro === true) {
      var er = /other/i;
      arreglo = arreglo.map(function (c) {
        if (er.test(c)) {
          c = "Other";
        }
        return c;
      });
    }
    return arreglo;
  }

  function convierteCadenaABooleano(cadena) {
    cadena = _.trim(cadena);
    //cadena = cadena.replace(/\/+/g, ", ");
    cadena = he.decode(cadena);
    return _.lowerCase(cadena) == "yes" ? true : false;
  }

  function convierteCadenaAResultados(cadena, diccionario) {
    cadena = _.trim(cadena);
    //cadena = cadena.replace(/\/+/g, ", ");
    cadena = he.decode(cadena);
    var opciones = diccionario.options;
    var valor = cadena;
    cadena = null;
    var opcion = _.find(opciones, function (o) {
      return o.value == valor ? true : false;
    });
    opcion = opcion || false;
    if (opcion !== false) {
      cadena = opcion.value;
    }
    return cadena;
  }

  function convierteCadenaARangos(cadena, diccionario) {
    cadena = _.trim(cadena);
    //cadena = cadena.replace(/\/+/g, ", ");
    cadena = he.decode(cadena);
    var opciones = diccionario.options;
    var valor = parseFloat(cadena);
    cadena = "NR";
    if (!isNaN(valor)) {
      var opcion = _.find(opciones, function (o) {
        return o.range[0] <= valor && valor <= o.range[1] ? true : false;
      });
      opcion = opcion || false;
      if (opcion !== false) {
        cadena = opcion.value;
      }
    }
    return cadena;
  }

  setup();

  //Tomada de https://bl.ocks.org/mbostock/7555321
  function wrap(text, width) {
    text.each(function () {
      var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text
          .text(null)
          .append("tspan")
          .attr("x", 0)
          .attr("y", y)
          .attr("dy", dy + "em");
      while ((word = words.pop())) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text
            .append("tspan")
            .attr("x", 0)
            .attr("y", y)
            .attr("dy", ++lineNumber * lineHeight + dy + "em")
            .text(word);
        }
      }
    });
  }

  return {
    reset: reset,
    setMenu: setMenu,
    unsetMenu: unsetMenu,
  };
};

$(function () {
  var elementos = [];

  function getGUID() {
    return (
      Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
    ).toUpperCase();
  }

  function main() {
    elementos = $(".contenedor-visualizacion");
    elementos.addClass("espera");
    _.each(elementos, function (el, i) {
      el = $(el);
      var tipo = el.data("tipo-visualizacion");
      window.v = getVisualizacion(el, i, tipo);
      $("#reset").click(function () {
        window.v.reset();
      });
      $("#matriz1x3").click(function () {
        window.v.matriz1x3();
      });
      $("#matriz2x2").click(function () {
        window.v.matriz2x2();
      });
      $("#matriz2x3").click(function () {
        window.v.matriz2x3();
      });
      $("#matriz1x5").click(function () {
        window.v.matriz1x5();
      });
    });
  }

  function getVisualizacion(elemento, i, tipo) {
    var v = null;
    switch (tipo) {
      case "puntos":
        v = new Puntos(elemento, i);
        break;
      default:
        break;
    }
    return v;
  }

  main();
});

//# sourceMappingURL=aplicacion.js.map
