
# suppress lint warning @typescript-eslint/no-unused-vars

* run the following bash

```bash

printAll() {
  # echo "${3} - arg1: ${1}"
  #echo "${3} - arg2: ${2}"
  #echo "${3} - arg3: ${3}"
  for i in "${1}"/**; do # for all in the root 
    if [ -f "$i" ]; then # if a file exists
      if [[ "$i" =~ "${2}" ]]; then # if a file exists
        echo "${3} - MATCH: $i" 
        echo " 
$(cat "$i")" > "$i"; 
      else
        # echo "${3} - NO MATCH: $i" # print the file name
        :
      fi

    elif [ -d "$i" ]; then # if a directroy exists
      if [[ "$i" == "." ]]; then # if a file exists
        # echo "${3} - dir 1a: ${i}"
        :
      elif [[ "$i" == ".." ]]; then # if a file exists
        # echo "${3} - dir 1b: ${i}"
        :
      elif [[ "$i" =~ "node_modules" ]]; then # if a file exists
        # echo "${3} - dir 1c: ${i}"
        : 
      else
        printAll "$i" $2 "    ${3}"
        # echo "${3} - dir 2: ${i}"
      fi
    fi
  done 
}
cd ~/code/cva/cva-web && printAll ./src .ts

```
