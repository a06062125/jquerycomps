<?php
    $count = isset( $_COOKIE['autoSelectCount'] ) ? (int) $_COOKIE['autoSelectCount'] : 60;
    $count++;
    setcookie( 'autoSelectCount', $count, time() + 60 * 60 * 24 );
echo <<<END
<dd>
    <select name='select{$count}_1' 
        defaultselect 
        selecturl="data/shengshi_with_error_code.php?id=0" 
        selecttarget="/select:eq(1)"
        selectvalue="14"
        >
        <option value="-1" defaultoption>请选择</option>
    </select>
    <select name='select{$count}_2' 
        selecturl="data/shengshi_with_error_code.php?id={0}" 
        selecttarget="/select:last"
        selectvalue="2341"
        >
        <option value="-1" defaultoption>请选择</option>
    </select>
    <select name='select{$count}_3' 
        selecturl="data/shengshi_with_error_code.php?id={0}"
        selectvalue="2343"
        >
        <option value="-1" defaultoption>请选择</option>
    </select>
</dd>
END;
?>

