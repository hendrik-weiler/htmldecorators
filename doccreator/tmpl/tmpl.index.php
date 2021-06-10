<h2>Classes</h2>
<table>
    <?php foreach($data['classes'] as $class): ?>

        <?php if($class['access'] == 'public'): ?>
            <tr>
                <td><a href="class.<?php print $class['name']; ?>.html"><?php print $class['name']; ?></a></td>
            </tr>
        <?php endif; ?>

    <?php endforeach; ?>
</table>
<h2>Functions</h2>
<table>
<?php foreach($data['functions'] as $function): ?>
    <tr>
        <td>
            <a href="function.<?php print $function['name'] ?>.html"><?php print $function['name'] ?></a>
        </td>
        <td>
            <?php print $function['description_fl'] ?>
        </td>
    </tr>
<?php endforeach; ?>
</table>
<h2>Decorators</h2>
<?php foreach($data['decorators'] as $ns => $decorators): ?>
    <h4><?php print $ns ?></h4>
    <table>
    <?php foreach($decorators as $decorator): ?>
        <tr>
            <td>
                <a href="class.<?php print $decorator['class']['name'] ?>.html"><?php print $decorator['decorator'] ?></a>
                <br>
                <?php print $this->printDecorator($decorator['class'],true) ?>
            </td>
        </tr>
    <?php endforeach; ?>
    </table>
<?php endforeach; ?>