#!/bin/bash

EXPT_HOME=${PROJECT_HOME}/exp1/js

runExperiment() {
  node ${EXPT_HOME}/index.js $1 $2 $3 > $4
  echo "  $2 keywords, $3 iterations ended."
}

analyseResults() {
  FILE_NAME=$1
  OUT_FILE_NAME=$2
  NUM_ITER=$3
  
  cut -d ':' -f 2 ${FILE_NAME}.csv > ${FILE_NAME}.cut
  sed -i '' 's/ms//g' ${FILE_NAME}.cut
  EXPT_MEAN=`awk '{ total += $1 } END { print total/NR }' ${FILE_NAME}.cut`
  EXPT_MIN=`awk 'BEGIN {a = 1000} {if ($1<0+a) a=$1} END {print a}' ${FILE_NAME}.cut`
  EXPT_MAX=`awk 'BEGIN {a = 0} {if ($1>0+a) a=$1} END {print a}' ${FILE_NAME}.cut`
  
  rm ${FILE_NAME}.*
  echo "Experiment-1,${NUM_ITER},${EXPT_MEAN},${EXPT_MIN},${EXPT_MAX}" >> ${OUT_FILE_NAME}
}

echo 'Experiment 1 started.'

runExperiment ${HAYSTACK_FILE} 5    ${NUM_ITER} ${CSV_DIR}/exp1-5.csv
runExperiment ${HAYSTACK_FILE} 10   ${NUM_ITER} ${CSV_DIR}/exp1-10.csv
runExperiment ${HAYSTACK_FILE} 50   ${NUM_ITER} ${CSV_DIR}/exp1-50.csv
runExperiment ${HAYSTACK_FILE} 100  ${NUM_ITER} ${CSV_DIR}/exp1-100.csv

analyseResults ${CSV_DIR}/exp1-5   ${CSV_DIR}/exp1.csv 5
analyseResults ${CSV_DIR}/exp1-10  ${CSV_DIR}/exp1.csv 10
analyseResults ${CSV_DIR}/exp1-50  ${CSV_DIR}/exp1.csv 50
analyseResults ${CSV_DIR}/exp1-100 ${CSV_DIR}/exp1.csv 100

echo "Experiment 1 ended. Results are saved in ${CSV_DIR}/exp1.csv"
